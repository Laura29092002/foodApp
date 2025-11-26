import { Component, Input } from '@angular/core';
import { Ingredient } from '../../models/ingredient/ingredient.model';

@Component({
  selector: 'app-ingredients-list',
  imports: [],
  templateUrl: './ingredients-list.html',
  styleUrl: './ingredients-list.scss',
})
export class IngredientsList {
  @Input() ingredient!: Ingredient;

}
