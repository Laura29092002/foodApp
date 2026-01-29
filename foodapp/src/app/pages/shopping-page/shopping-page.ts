import { Component, OnInit } from '@angular/core';
import { IngredientsList } from '../../components/ingredients-list/ingredients-list';
import { Category } from '../../models/category/category.model';
import { CategoryService } from '../../services/category/category';
import { DayService } from '../../services/day/day';
import { RecipeService } from '../../services/recipe/recipe';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { forkJoin, mergeMap, of } from 'rxjs';
import { Loader } from "../../components/loader/loader";
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';


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
  user : User | null = null;

  constructor(private categoryService: CategoryService, private dayService: DayService, private recipeService: RecipeService, private userService: UserService) { }
 
  ngOnInit() {
    this.isloading = true;
    this.userService.currentUser.subscribe(
      data => {
        this.user = data
      }
    )
    this.dayService.getDaysByUserId(this.user!.id).pipe(
      // Attend que getDaysByUserId() termine, puis traite les recettes
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
