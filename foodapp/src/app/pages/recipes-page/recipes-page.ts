import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { RecipeService } from '../../services/recipe/recipe';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BigRecipeCard } from "../../components/big-recipe-card/big-recipe-card";
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as PlanningActions from '../../store/planning-store/planning-store.actions';
import * as PlanningSelectors from '../../store/planning-store/planning-store.selectors';

@Component({
  selector: 'app-recipes-page',
  imports: [FormsModule, BigRecipeCard],
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss',
})
export class RecipesPage implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  searchTerm: string = '';
  selectedRecipe?: Recipe;
  root: string = '';
  editionMode: boolean = false;
  isSelecting: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private _location: Location,
    private store: Store
  ) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
    }); 

    this.root = this.router.url;
    
    this.store.select(PlanningSelectors.selectIsSelecting)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isSelecting => {
        this.isSelecting = isSelecting;
        this.editionMode = isSelecting;
      });

    this.store.select(PlanningSelectors.selectSelectionContext)
      .pipe(takeUntil(this.destroy$))
      .subscribe(context => {
        if (context) {
          console.log('Sélection pour:', context);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  onSelectRecipe(recipe: Recipe) {
    if (this.isSelecting) {
      this.selectedRecipe = recipe;
      console.log('Recette sélectionnée:', this.selectedRecipe);
    }
  }

  addRecipe() {
    this.router.navigate(['/create-recipe']);
  }

  filteredRecipes() {
    return this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addRecipeToPlanning() {
    if (this.selectedRecipe && this.isSelecting) {
      this.store.dispatch(PlanningActions.setRecipeToDay({ 
        recipe: this.selectedRecipe 
      }));
      
      this.router.navigate(['/modify-planning']);
    }
  }

  onCancel() {
    this.store.dispatch(PlanningActions.cancelRecipeSelection());
    this._location.back();
  }
}