import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../../models/ingredient/ingredient.model';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IngredientService } from '../../../services/ingredient/ingredient';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIngredientsData } from '../../../store/recipe-form.selectors';
import * as RecipeFormActions from '../../../store/recipe-form.actions';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe/recipe';

@Component({
  selector: 'app-add-ingredients-to-recipe',
  imports: [NgMultiSelectDropDownModule, FormsModule],
  templateUrl: './add-ingredients-to-recipe.html',
  styleUrl: './add-ingredients-to-recipe.scss',
})
export class AddIngredientsToRecipe implements OnInit, OnDestroy{
  @Input() recipeId : number | null = null;
  quantities: { [key: number]: number } = {};
  dropdownList: Ingredient[] = [];
  selectedItems: Ingredient[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    defaultOpen: false
  };
  private destroy$ = new Subject<void>();
  
  constructor(private ingredientService: IngredientService, private store: Store, private route : ActivatedRoute, private recipeService : RecipeService) { }
  
  ngOnInit() {
    this.ingredientService.getIngredients().subscribe(data => {
      this.dropdownList = data;
    });
    if(this.recipeId){
      this.recipeService.getAllIngredientsByRecipe(this.recipeId).subscribe(
        data => {
          this.selectedItems = data;
          this.quantities = {};
          this.selectedItems.forEach(ing => {
            this.quantities[ing.id] = ing.quantity || 0;
          })
          this.updateStore();
        }
      )
    }else{
      this.selectedItems = [];
    }

    this.store.select(selectIngredientsData).pipe(takeUntil(this.destroy$)).subscribe(ingredient =>
    {
      if(ingredient && ingredient.length > 0){
        this.selectedItems = ingredient.map(ing =>
        ({
          id: ing.id,
          name: ing.name
        })
        );
        this.quantities = {};
        ingredient.forEach(ing => {
          this.quantities[ing.id] = ing.quantity || 0;
        });
        
      }
    }
    )
    
  }
  
  
  
    onItemSelect(item: any) {
      if(!this.quantities[item.id]){
        this.quantities[item.id] = 0;
      }
      this.updateStore();
    }
  
    onSelectAll(items: any) {
      items.forEach((item: any) => {
        if(!this.quantities[item.id]){
        this.quantities[item.id] = 0;
      }
      this.updateStore();
      });
    }

    removeIngredient(ingredient: Ingredient){
      this.selectedItems = this.selectedItems.filter(item => item.id !== ingredient.id);
      delete this.quantities[ingredient.id];
      this.updateStore();
    }

    updateStore(){
      const ingredientWithQuantities: Ingredient[] = this.selectedItems.map(item =>
        ({
          id: item.id,
          name: item.name,
          quantity: this.quantities[item.id] || 0
        })
      );

      this.store.dispatch(
        RecipeFormActions.saveIngredientsData({
          ingredients: ingredientWithQuantities
        })
      )
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  

}
