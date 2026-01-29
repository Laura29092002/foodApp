import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, switchMap, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Recipe } from '../../models/recipe/recipe.model';
import { StepService } from '../../services/step/step';
import { RecipeService } from '../../services/recipe/recipe';
import { Location } from '@angular/common';
import { IngredientComponent } from "../../components/ingredient-component/ingredient-component";

@Component({
  selector: 'app-recipe-page',
  imports: [IngredientComponent],
  templateUrl: './recipe-page.html',
  styleUrl: './recipe-page.scss',
})
export class RecipePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly stepService = inject(StepService);
  private readonly recipeService = inject(RecipeService);
  private readonly destroyRef = inject(DestroyRef);

  recipe!: Recipe;

  isLoading = true;
  error: string | null = null;

  constructor(private _location: Location){
  }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    
    if (!recipeId) {
      this.error = 'ID de recette invalide';
      this.isLoading = false;
      return;
    }

    this.loadRecipeData(Number(recipeId));
  }

  private loadRecipeData(recipeId: number): void {
    this.recipeService.getRecipeById(recipeId)
      .pipe(
        switchMap(recipe => {
          this.recipe = recipe;
          
          return forkJoin({
            ingredients: this.recipeService.getAllIngredientsByRecipe(recipeId),
            steps: this.stepService.getStepByRecipe(recipeId)
          });
        }),
        tap(({ ingredients, steps }) => {
          this.recipe.ingredients = ingredients;
          this.recipe.steps = [...steps].sort((a, b) => a.number - b.number);
          this.isLoading = false;
          console.log('Recette chargée:', this.recipe);
        }),
        catchError(err => {
          console.error('Erreur lors du chargement de la recette:', err);
          this.error = 'Impossible de charger la recette';
          this.isLoading = false;
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onCancel(){
    this._location.back();
  }
}