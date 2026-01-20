import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe/recipe';
import { Recipe } from '../../models/recipe/recipe.model';
import { Router } from '@angular/router';
import { DayService } from '../../services/day/day';

@Component({
  selector: 'app-recipes-dashboard',
  imports: [],
  templateUrl: './recipes-dashboard.html',
  styleUrl: './recipes-dashboard.scss',
})
export class RecipesDashboard implements OnInit {
  recipes : Recipe[] = [];

  constructor(private recipeService: RecipeService, private dayService: DayService, private router: Router){}

  ngOnInit(): void {

    this.recipeService.getRecipes().subscribe(data =>{
      this.recipes = data;
    })
    
  }

  addRecipe() {
    this.router.navigate(['/create-recipe']);
  }

  deleteRecipe(idRecipe: number){
    this.dayService.changeRecipeIdValue(idRecipe).subscribe();
    this.recipeService.deleteRecipe(idRecipe).subscribe();
    const index = this.recipes.findIndex(recipe => recipe.id === idRecipe);
    
    if (index !== -1) {
        this.recipes.splice(index, 1);
    }
    console.log(this.recipes)
  }

}
