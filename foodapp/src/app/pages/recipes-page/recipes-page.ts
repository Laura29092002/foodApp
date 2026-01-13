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
    // Charger les recettes
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
    }); 

    this.root = this.router.url;
    
    // Vérifier si on est en mode sélection depuis le store
    this.store.select(PlanningSelectors.selectIsSelecting)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isSelecting => {
        this.isSelecting = isSelecting;
        this.editionMode = isSelecting;
      });

    // Optionnel : afficher des infos sur le contexte de sélection
    this.store.select(PlanningSelectors.selectSelectionContext)
      .pipe(takeUntil(this.destroy$))
      .subscribe(context => {
        if (context) {
          console.log('Sélection pour:', context);
          // Vous pourriez afficher "Sélection pour Lundi - Déjeuner" par exemple
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
      // Dispatcher l'action pour ajouter la recette au planning
      this.store.dispatch(PlanningActions.setRecipeToDay({ 
        recipe: this.selectedRecipe 
      }));
      
      // Retourner à la page planning
      this.router.navigate(['/modify-planning']); // ou '/create-planning' selon le contexte
    }
  }

  onCancel() {
    // Annuler la sélection
    this.store.dispatch(PlanningActions.cancelRecipeSelection());
    this._location.back();
  }
}