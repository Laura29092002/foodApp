import { Component, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRecipeForm from '../../store/recipe-form.selectors';
import { RecipeForm1 } from "../../components/recipe-form/recipe-form-1/recipe-form-1";
import { AddIngredientsToRecipe } from "../../components/recipe-form/add-ingredients-to-recipe/add-ingredients-to-recipe";
import { AddStepsToRecipe } from "../../components/recipe-form/add-steps-to-recipe/add-steps-to-recipe";
import { RecipeService } from '../../services/recipe/recipe';
import { StepService } from '../../services/step/step';
import { Step } from '../../models/step/step.model';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-recipe-form',
  imports: [RecipeForm1, AddIngredientsToRecipe, AddStepsToRecipe],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
})
export class RecipeForm {

  @ViewChild(RecipeForm1) recipeForm1!: RecipeForm1; // Pour accéder au fichier image

  constructor(
    private store: Store, 
    private recipeService: RecipeService, 
    private stepService: StepService, 
    private router: Router,
    private _location: Location
  ) {}

  onCancel(){
    this._location.back();
  }

  onSubmit() {
    this.store.select(fromRecipeForm.selectCompleteRecipe)
      .pipe(take(1)) 
      .subscribe(recipe => {
        console.log('Recette complète:', recipe);

        if (!recipe.recette.name) {
          alert('Le nom de la recette est requis');
          return;
        }

        const imageFile = this.recipeForm1?.getImageFile();

        this.recipeService.addRecipe(recipe.recette.name, imageFile || undefined).subscribe({
          next: (createdRecipe) => {
            console.log("Recette créée:", createdRecipe);

            const ingredientPromises = recipe.ingredients.map(ing => {
              if (ing.quantity) {
                return this.recipeService.addIngredientToRecipe(
                  createdRecipe.id, 
                  ing.id, 
                  ing.quantity
                ).toPromise();
              }
              return Promise.resolve();
            });

            Promise.all(ingredientPromises).then(() => {
              console.log("Tous les ingrédients ajoutés");

            }).catch(err => {
              console.error("Erreur lors de l'ajout des ingrédients:", err);
            });

            const stepPromises = recipe.steps.map(step => {
              const newStep = new Step(0, step.number, step.description, createdRecipe.id);
              return this.stepService.addStep(newStep).toPromise();
            });
            Promise.all(stepPromises).then(() => {
              console.log("Toutes les étapes ajoutées");
              
              this.router.navigate(['/recipe', createdRecipe.id]);
            }).catch(err => {
              console.error("Erreur lors de l'ajout des étapes:", err);
            });
          },
          error: (err) => {
            console.error("Erreur lors de la création de la recette:", err);
            alert("Erreur lors de la création de la recette");
          }
        });
      });
  }
}