import { Component, Input} from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-day-card',
  imports: [],
  templateUrl: './recipe-day-card.html',
  styleUrl: './recipe-day-card.scss',
})
export class RecipeDayCard {
  @Input() recipe!: Recipe;

  constructor(private router : Router) { }
  onClick(){
    this.router.navigate(["/recipes-select"])
  }
  
}
