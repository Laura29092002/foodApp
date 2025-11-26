import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];
  private apiUrl = 'http://localhost:8080/category';
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }
  getCategoryById(id: number) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
  addCategory(category: Category) {
    return this.http.post<Category>(this.apiUrl, category);
  }
  updateCategory(id: number, updatedCategory: Category) {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, updatedCategory);
  }
  deleteCategory(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
