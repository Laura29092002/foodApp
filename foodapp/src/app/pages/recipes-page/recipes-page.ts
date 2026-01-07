import { Component, OnInit } from '@angular/core';
import { RecipeCard } from '../../components/recipe-card/recipe-card';
import { Recipe } from '../../models/recipe/recipe.model';
import { RecipeService } from '../../services/recipe/recipe';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-recipes-page',
  imports: [RecipeCard, FormsModule],
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss',
})
export class RecipesPage implements  OnInit {
  recipes: Recipe[] = [];
  searchTerm: string = '';

  
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
    }); 
  }

  addRecipe() {
    this.router.navigate(['/create-recipe']);
  }
  

  filteredRecipes() {
    return this.recipes.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  

}
