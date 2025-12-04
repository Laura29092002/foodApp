import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient/ingredient';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { IngredientForm } from "../../components/ingredient-form/ingredient-form";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  imports: [IngredientForm, FormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage implements OnInit{
  ingredients! : Ingredient[];
  isOpen: Boolean = false;
  editingId: number | null = null;
  editedIngredient: any = {};

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
    this.isOpen = !this.isOpen;
  }

  updateIngredient(ingredient: Ingredient) {
    this.editingId = ingredient.id;
    this.editedIngredient = { ...ingredient };
  }

  saveIngredient(index: number) {
    this.ingredients[index] = { ...this.editedIngredient };

    this.ingredientService.updateIngredient(this.editedIngredient).subscribe();
    
    
    // Réinitialiser
    this.editingId = null;
    this.editedIngredient = {};
  }

  cancelEdit() {
    this.editingId = null;
    this.editedIngredient = {};
  }

  reload(newIngredient : Ingredient){
    this.isOpen = false;
    this.ingredients.push(newIngredient);
    console.log(this.ingredients);

  }

  
}
