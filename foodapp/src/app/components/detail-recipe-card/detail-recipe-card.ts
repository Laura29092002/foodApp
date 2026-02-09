import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { StepService } from '../../services/step/step';
import { RecipeService } from '../../services/recipe/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-recipe-card',
  imports: [],
  templateUrl: './detail-recipe-card.html',
  styleUrl: './detail-recipe-card.scss',
})
export class DetailRecipeCard implements OnInit{
  @Input() recipe!: Recipe;
  
  constructor(private recipeService : RecipeService, private stepService : StepService, private router : Router){
  }

  ngOnInit(): void {
    this.recipeService.getAllIngredientsByRecipe(this.recipe.id).subscribe(
      ingredients => { this.recipe.ingredients = ingredients}
    );
    this.stepService.getStepByRecipe(this.recipe.id).subscribe(
      steps => { 
        steps.sort((a, b) => a.number - b.number);
        this.recipe.steps = steps;
        console.log(this.recipe)
      }
      
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['recipe']){
      this.ngOnInit();
    }
  }

  onClick(){
    this.router.navigate(['/recipe', this.recipe.id])
  }
}
