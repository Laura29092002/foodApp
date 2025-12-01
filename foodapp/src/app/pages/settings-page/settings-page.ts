import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient/ingredient';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { IngredientForm } from "../../components/ingredient-form/ingredient-form";

@Component({
  selector: 'app-settings-page',
  imports: [IngredientForm],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage implements OnInit{
  ingredients! : Ingredient[];
  isOpen: Boolean = false;

  constructor(private ingredientService: IngredientService){
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(
      data => {
        this.ingredients = data;
      }
    )
  }

  deleteIngredient(ingredientId : number, index : number){
    this.ingredientService.deleteIngredient(ingredientId).subscribe();
    this.ingredients.splice(index);
  }

  addIngredient(){
    if(this.isOpen){
      this.isOpen = false
    }else{
      this.isOpen = true;
    }
  }


}
