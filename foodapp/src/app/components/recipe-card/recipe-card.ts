import { Component, Input} from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard{
  @Input() recipe!: Recipe;

  constructor(private router : Router) { }

  onClick() {
    this.router.navigate(['/recipe', this.recipe.id]);
  }

}
