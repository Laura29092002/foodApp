import { Component, OnInit } from '@angular/core';
import { Day } from '../../models/day/day.model';
import { DayService } from '../../services/day/day';
import { RecipeCard } from "../../components/recipe-card/recipe-card";
import { RecipeService } from '../../services/recipe/recipe';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-planning',
  imports: [RecipeCard],
  templateUrl: './planning.html',
  styleUrl: './planning.scss',
})
export class Planning implements OnInit {
  days: Day[] = [];

  constructor(private dayService :DayService, private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
      this.dayService.getDays().subscribe(data => {
        data.sort((a, b) => a.id - b.id);
        data.forEach(day => {
          day.listOfRecipe = [];
        });
        this.days = data;
  
        data.forEach(day => {
  
          forkJoin({
            lunch: this.recipeService.getRecipeById(day.recipeLunchId!),
            dinner: this.recipeService.getRecipeById(day.recipeDinnerId!)
          }).subscribe(({ lunch, dinner }) => {
            day.listOfRecipe = [lunch, dinner];
          });
  
        });
        console.log(this.days)
      });
    }

  modifyPlanning(){
    this.router.navigate(['/modify-planning']);
  }


}
