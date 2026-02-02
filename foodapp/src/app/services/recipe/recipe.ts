import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private recipesPreference : Recipe[] = [];
  private size : number = 0;
  private apiUrl = 'http://localhost:8080/recipe';

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id: number) {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  getAllIngredientsByRecipe(id: number) {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredients/${id}`);
  }

  addIngredientToRecipe(id_recipe: number, id_ingredient: number, quantity: number){
    return this.http.post<void>(`${this.apiUrl}/${id_recipe}/${id_ingredient}/${quantity}`, null);
  }

  

  addRecipe(name: string, imageFile?: File): Observable<Recipe> {
    const formData = new FormData();
    formData.append('name', name);
    
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    return this.http.post<Recipe>(this.apiUrl, formData);
  }

  

  updateRecipe(id: number, name: string, imageFile?: File): Observable<Recipe> {
    const formData = new FormData();
    formData.append('name', name);
    
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, formData);
  }

  deleteIngredientsByRecipeId(id : number){
    return this.http.delete<void>(`${this.apiUrl}/deleteIngredient/${id}`)
  }

  deleteRecipe(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRecipeImageUrl(id: number): string {
    return `${this.apiUrl}/${id}/image`;
  }

  getCategoryByPreference(regimeId : number) : number{
    switch(regimeId){
      case 1: //vegetarian
        return 2;
      case 2: //vegan
        return 1;
      case 3: //without gluten
        return 3;
      case 4: //without milk
        return 1; 
      default: 
        return 0;
    }

  }

  getRecipeByPreference(regimeId: number): Observable<Recipe[]> {
  const categoryByPreference = this.getCategoryByPreference(regimeId);

  return this.getRecipes().pipe(
    switchMap(recipes => {
      // Créer un tableau d'observables pour tous les ingrédients
      const recipeObservables = recipes.map(recipe => 
        this.getAllIngredientsByRecipe(recipe.id).pipe(
          map(ingredients => {
            recipe.ingredients = ingredients;
            
            // Compter les ingrédients de la catégorie
            const matchingCount = ingredients.filter(
              ig => ig.categoryId === categoryByPreference
            ).length;
            
            // Retourner la recette avec un flag
            return { recipe, hasNoMatch: matchingCount === 0 };
          })
        )
      );
      
      // Attendre que tous les observables se terminent
      return forkJoin(recipeObservables);
    }),
    map(results => {
      // Filtrer seulement les recettes sans match
      return results
        .filter(r => r.hasNoMatch)
        .map(r => r.recipe);
    })
  );
}

  
}
