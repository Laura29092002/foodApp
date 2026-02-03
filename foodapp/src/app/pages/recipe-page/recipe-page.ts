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
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';

@Component({
  selector: 'app-recipe-page',
  imports: [IngredientComponent],
  templateUrl: './recipe-page.html',
  styleUrl: './recipe-page.scss',
})
export class RecipePage implements OnInit {
  recipe: Recipe = new Recipe(0,"","");
  user : User | null = null;
  isLoading = true;

  constructor(private _location: Location, private userService : UserService, private route: ActivatedRoute,private recipeService : RecipeService, private stepService : StepService, private destroyRef: DestroyRef){
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
      }
    )
  }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    
    if (!recipeId) {
      console.error('Pas recipeId valide');
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
          //console.log('Recette chargée:', this.recipe);
        }),
        catchError(err => {
          console.error('Erreur lors du chargement de la recette:', err);
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