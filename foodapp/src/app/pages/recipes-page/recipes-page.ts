import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { RecipeService } from '../../services/recipe/recipe';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BigRecipeCard } from "../../components/big-recipe-card/big-recipe-card";
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import * as PlanningActions from '../../store/planning-store/planning-store.actions';
import * as PlanningSelectors from '../../store/planning-store/planning-store.selectors';
import { Loader } from "../../components/loader/loader";
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { RegimeService } from '../../services/regime/regime';

@Component({
  selector: 'app-recipes-page',
  imports: [FormsModule, BigRecipeCard, Loader],
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss',
})
export class RecipesPage implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  preferenceRecipes: Recipe[] = [];
  user: User | null = null;
  searchTerm: string = '';
  selectedRecipe?: Recipe;
  editionMode: boolean = false;
  isSelecting: boolean = false;
  isloading: boolean = false;
  regime : string = '';
  itemsPerPage : number = 4;
  currentPage : number = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private _location: Location,
    private store: Store,
    private userService : UserService,
    private regimeService : RegimeService
  ) {}

  ngOnInit() {
    this.isloading = true;

    this.updateItemsPerPage();

    fromEvent(window, 'resize')
    .pipe(debounceTime(200)) 
    .subscribe(() => {
      this.updateItemsPerPage();
    });
    this.userService.currentUser.subscribe(
      data =>{
        this.user = data;
        if(this.user?.regimeId){
          this.recipeService.getRecipeByPreference(this.user.regimeId).subscribe(
            data => { this.preferenceRecipes = data}
          );
          this.regimeService.getRegimeById(this.user.regimeId).subscribe(
            rg => {
              this.regime = rg.name;
            }
          )
        }
      }
    );
  
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
      this.isloading = false;
    }); 

    
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

  updateItemsPerPage(){
    const sizeScreen = window.innerWidth;
    if(sizeScreen <870){
      this.itemsPerPage = 1;
    }
    else if(sizeScreen < 1200){
      this.itemsPerPage = 2;
    }else if(sizeScreen < 1500){
      this.itemsPerPage = 3;
    }else{
      this.itemsPerPage = 4;
    }
  }

  get paginatedItems() {
    const start = this.currentPage * this.itemsPerPage;
    return this.preferenceRecipes.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.preferenceRecipes.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
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