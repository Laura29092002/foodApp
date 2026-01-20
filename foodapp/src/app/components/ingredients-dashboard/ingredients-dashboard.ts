import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient/ingredient';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { CategoryService } from '../../services/category/category';
import { Category } from '../../models/category/category.model';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule } from '@angular/forms';
import { Loader } from "../loader/loader";
import { IngredientForm } from "../ingredient-form/ingredient-form";
@Component({
  selector: 'app-ingredients-dashboard',
  imports: [PickerModule, FormsModule, Loader, IngredientForm],
  templateUrl: './ingredients-dashboard.html',
  styleUrl: './ingredients-dashboard.scss',
})
export class IngredientsDashboard implements OnInit{
  ingredients : Ingredient[] = [];
  isOpen: Boolean = false;
  isIcon: Boolean = false;
  editingId: number | null = null;
  editedIngredient: any = {};
  categories: Category[] = [];
  isloading: boolean = false;

  constructor(private ingredientService: IngredientService, private categoryService: CategoryService){
  }

  ngOnInit(): void {
    this.isloading = true;
    this.ingredientService.getIngredients().subscribe(
      data => {
        this.ingredients = data;
        console.log(this.ingredients)
      }
    );
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        this.isloading = false;
      }
    )
  }

  deleteIngredient(ingredientId : number, index : number){
    this.ingredientService.deleteIngredient(ingredientId).subscribe();
    this.ingredients.splice(index);
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
    this.isIcon = false;
  }

  cancelEdit() {
    this.editingId = null;
    this.editedIngredient = {};
    this.isIcon = false;
  }


  addEmoji(event: any){
    this.editedIngredient.image = event.emoji.native;
    console.log(this.editedIngredient.image);
    this.isIcon = false;

  }
  changeEmoji(){
    if(this.isIcon){
      this.isIcon = false;
    }else{
      this.isIcon = true;
    }
  }

  addIngredient(){
    this.isOpen = !this.isOpen;
  }

  reload(newIngredient : Ingredient){
    this.isOpen = false;
    this.ingredients.push(newIngredient);
    console.log(this.ingredients);

  }

  
}

