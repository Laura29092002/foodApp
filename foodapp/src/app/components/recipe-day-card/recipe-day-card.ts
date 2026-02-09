import { Component, Input} from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlanningActions from '../../store/planning-store/planning-store.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBox } from '../confirm-box/confirm-box';
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

  constructor(private router : Router, private store: Store, private dialog: MatDialog) { }


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
    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '350px',
      data: {message: 'Êtes-vous sûr de vouloir supprimer cette recette ?'}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          if(mealType == 'lunch'){
            this.store.dispatch(PlanningActions.startRecipeSelection({ 
              dayId, 
              mealType: 'lunch' 
            }));
            this.store.dispatch(PlanningActions.setRecipeToDay({ 
              recipe: new Recipe(0, "", "")
            }));
          }
          else if (mealType == 'dinner'){
            this.store.dispatch(PlanningActions.removeRecipeFromDay({ dayId, mealType }));
          }

        }
      }
    )
  }
}
