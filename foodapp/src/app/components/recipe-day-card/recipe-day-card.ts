import { Component, Input} from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlanningActions from '../../store/planning-store/planning-store.actions';
@Component({
  selector: 'app-recipe-day-card',
  imports: [],
  templateUrl: './recipe-day-card.html',
  styleUrl: './recipe-day-card.scss',
})
export class RecipeDayCard {
  @Input() recipe!: Recipe;
  @Input() dayId!: number;
  @Input() typeOfMeal!: string;

  constructor(private router : Router, private store: Store) { }

  onClick() {
    this.router.navigate(['/recipe', this.recipe.id]);
  }

  modifyRecipe(dayId: number, mealType: string) {
    if(mealType == 'lunch' || mealType == 'dinner'){
      this.store.dispatch(PlanningActions.startRecipeSelection({ 
        dayId, 
        mealType 
      }));
    }
      this.router.navigate(["/recipes-select"]);
    }
  
  removeRecipe(dayId: number, mealType: string) {
    if(mealType == 'lunch' || mealType == 'dinner'){
      if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
        this.store.dispatch(PlanningActions.removeRecipeFromDay({ dayId, mealType }));
      }
    }
  }
}
