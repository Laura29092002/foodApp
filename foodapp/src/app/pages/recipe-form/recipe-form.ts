import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import * as RecipeFormActions from '../../store/recipe-form.actions';
import * as fromRecipeForm from '../../store/recipe-form.selectors';

import { RecipeForm1 } from "../../components/recipe-form/recipe-form-1/recipe-form-1";
import { AddIngredientsToRecipe } from "../../components/recipe-form/add-ingredients-to-recipe/add-ingredients-to-recipe";
import { AddStepsToRecipe } from "../../components/recipe-form/add-steps-to-recipe/add-steps-to-recipe";
import { Recipe } from '../../models/recipe/recipe.model';
import { RecipeService } from '../../services/recipe/recipe';
import { IngredientService } from '../../services/ingredient/ingredient';
import { StepService } from '../../services/step/step';
import { Step } from '../../models/step/step.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  imports: [RecipeForm1, AddIngredientsToRecipe, AddStepsToRecipe],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
})
export class RecipeForm {


  constructor(private store: Store, private recipeService : RecipeService, private stepService: StepService, private route: Router) {
  }

  onSubmit() {
    
    // Récupérer toutes les données
    this.store.select(fromRecipeForm.selectCompleteRecipe).subscribe(recipe => {
      console.log('Recette complète:', recipe);

      if(recipe.recette.name){
        const newRecipe = new Recipe(0, recipe.recette.name, "");
        console.log(newRecipe);
        
        this.recipeService.addRecipe(newRecipe).subscribe({
           next: (data) => {
            console.log("added", data)
            for(let ing of recipe.ingredients){
              if(ing.quantity){
                this.recipeService.addIngredientToRecipe(data.id, ing.id, ing.quantity).subscribe({
                  next: (ingre) => console.log("added", ingre)
                })
              }
            }
            for(let step of recipe.steps){
              const newStep = new Step(0, step.number, step.description, data.id);
              this.stepService.addStep(newStep).subscribe({
                next: (stp) => console.log("added", stp),
                error: (err) => console.error(err)
              })
            }
            this.route.navigate(['/recipe', data.id]);
          },
           error: (err) => console.error(err)
        });

        

        
      }

      
      
      
    }).unsubscribe();

    
  }

  


}
