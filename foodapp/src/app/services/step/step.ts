import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Step } from '../../models/step/step.model';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private steps: Step[] = [];
  private apiUrl = 'http://localhost:8080/step';

  constructor(private http: HttpClient) {}

  getSteps() {
    return this.http.get<Step[]>(this.apiUrl);
  }

  getStepByRecipe(id: number) {
    return this.http.get<Step[]>(`${this.apiUrl}/recipe/${id}`);
  }

  addStep(step: Step) {
    return this.http.post<Step>(this.apiUrl, step);
  }

  updateStep(id: number, updatedStep: Step) {
    return this.http.put<Step>(`${this.apiUrl}/${id}`, updatedStep);
  }

  deleteStep(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}