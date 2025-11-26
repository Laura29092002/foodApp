import { Component, OnInit } from '@angular/core';
import { IngredientsList } from '../../components/ingredients-list/ingredients-list';
import { Category } from '../../models/category/category.model';
import { CategoryService } from '../../services/category/category';
import { IngredientService } from '../../services/ingredient/ingredient';

@Component({
  selector: 'app-shopping-page',
  imports: [IngredientsList],
  templateUrl: './shopping-page.html',
  styleUrl: './shopping-page.scss',
})
export class ShoppingPage implements  OnInit {
  shopping : Category[] = [];

  constructor(private categoryService: CategoryService, private ingredientService : IngredientService) { }
  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      data.forEach(category => {
        this.ingredientService.getIngredientByCategory(category.id).subscribe(ingredients => {
          category.ingredients = ingredients;
        });
      });
      this.shopping = data;
      console.log(this.shopping);
    }); 
  }

}
