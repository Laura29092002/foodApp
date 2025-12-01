import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category';
import { Category } from '../../models/category/category.model';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import { IngredientService } from '../../services/ingredient/ingredient';

@Component({
  selector: 'app-ingredient-form',
  imports: [PickerModule, ReactiveFormsModule],
  templateUrl: './ingredient-form.html',
  styleUrl: './ingredient-form.scss',
})
export class IngredientForm implements OnInit{
  form: FormGroup;
  categories! : Category[];
  selectedIcon = "";
  isOpen = true;
  constructor(private categoryService: CategoryService, private fb:FormBuilder, private ingredientService: IngredientService){
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['',Validators.required]
    })

  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      data =>{
        this.categories = data;
      }
    )
  }

  addEmoji(event: any){
    this.selectedIcon = event.emoji.native;
    console.log(this.selectedIcon);
    this.isOpen = false;

  }
  changeEmoji(){
    if(this.isOpen){
      this.isOpen = false;
    }else{
      this.isOpen = true;
    }
  }

  addIngredient(){
    const ingredient = new Ingredient(0, this.form.value.name);
    ingredient.categoryId = this.form.value.categoryId;
    ingredient.image = this.selectedIcon;
    
    console.log(ingredient);
    if(ingredient.name != "" && ingredient.categoryId){
      this.ingredientService.addIngredient(ingredient).subscribe({
        next: (response) => {
          console.log('Ingrédient ajouté avec succès', response);
          this.form.reset();
          this.selectedIcon = '';
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout", error);
        }
      }
        
      )
    }

    
  }

}
