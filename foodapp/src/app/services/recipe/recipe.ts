import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { Ingredient } from '../../models/ingredient/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
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
    return this.http.post<number>(`${this.apiUrl}/${id_recipe}/${id_ingredient}/${quantity}`, id_recipe);
  }

  
  addRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  

  updateRecipe(id: number, updatedRecipe: Recipe) {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, updatedRecipe);
  }

  deleteRecipe(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
