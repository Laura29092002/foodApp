import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredient/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredients: Ingredient[] = [];
  private apiUrl = 'http://localhost:8080/ingredient';

  constructor(private http: HttpClient) {}

  getIngredients() {
    return this.http.get<Ingredient[]>(this.apiUrl);
  } 

  getIngredientByCategory(id: number) {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/category/${id}`);
  }

  addIngredient(ingredient: Ingredient) {   
    return this.http.post<Ingredient>(this.apiUrl, ingredient);
  }

  updateIngredient(updatedIngredient: Ingredient) {
    return this.http.put<Ingredient>(`${this.apiUrl}`, updatedIngredient);
  }

  deleteIngredient(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
