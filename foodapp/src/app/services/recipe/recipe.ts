import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { Observable } from 'rxjs';

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

  deleteRecipe(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRecipeImageUrl(id: number): string {
    return `${this.apiUrl}/${id}/image`;
  }

  
}
