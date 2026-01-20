import { Component, OnInit } from '@angular/core';
import { IngredientsList } from '../../components/ingredients-list/ingredients-list';
import { Category } from '../../models/category/category.model';
import { CategoryService } from '../../services/category/category';
import { DayService } from '../../services/day/day';
import { RecipeService } from '../../services/recipe/recipe';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { forkJoin, mergeMap, of } from 'rxjs';
import { Loader } from "../../components/loader/loader";


@Component({
  selector: 'app-shopping-page',
  imports: [IngredientsList, Loader],
  templateUrl: './shopping-page.html',
  styleUrl: './shopping-page.scss',
})
export class ShoppingPage implements  OnInit {
  shopping : Category[] = [];
  ingredients : Ingredient[][] = [];
  isloading : boolean = false;

  constructor(private categoryService: CategoryService, private dayService: DayService, private recipeService: RecipeService) { }
 
  ngOnInit() {
    this.isloading = true;
    this.dayService.getDays().pipe(
      // Attend que getDays() termine, puis traite les recettes
      mergeMap(days => {
        const requests = days.flatMap(recipe => {
          const reqs = [];
          if (recipe.recipeLunchId) {
            reqs.push(this.recipeService.getAllIngredientsByRecipe(recipe.recipeLunchId));
          }
          if (recipe.recipeDinnerId) {
            reqs.push(this.recipeService.getAllIngredientsByRecipe(recipe.recipeDinnerId));
          }
          return reqs;
      });
        
        // Attend que TOUTES les requêtes d'ingrédients soient terminées
        return requests.length > 0 ? forkJoin(requests) : of([]);
      })
    ).subscribe(allIngredients => {
      this.ingredients = allIngredients;
      
      // Maintenant on peut récupérer les catégories
      this.categoryService.getCategories().subscribe(categories => {
        this.shopping = categories;
        const test = this.categoryService.getAllIngredientsByCategoryAndRecipeOfDay(
          this.ingredients,
          this.shopping
        );
        console.log(test);
        this.isloading = false;
      });
    });
  }

}
