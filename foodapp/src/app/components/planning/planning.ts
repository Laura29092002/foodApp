import { Component, OnInit } from '@angular/core';
import { Day } from '../../models/day/day.model';
import { DayService } from '../../services/day/day';
import { RecipeCard } from "../../components/recipe-card/recipe-card";
import { RecipeService } from '../../services/recipe/recipe';

@Component({
  selector: 'app-planning',
  imports: [RecipeCard],
  templateUrl: './planning.html',
  styleUrl: './planning.scss',
})
export class Planning implements OnInit {
  days: Day[] = [];

  constructor(private dayService :DayService, private recipeService: RecipeService) {}

  ngOnInit() {
    this.dayService.getDays().subscribe(data => {
      data.forEach(day => {
        this.recipeService.getRecipeById(day.recipeLunchId!).subscribe(recipe => {
          day.recipeLunch = recipe;
        });
        this.recipeService.getRecipeById(day.recipeDinnerId!).subscribe(recipe => {
          day.recipeDinner = recipe;
        });
      });
      this.days = data;
      console.log(this.days);
    });
  }


}
