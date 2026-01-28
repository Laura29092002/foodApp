import { Component, Input } from '@angular/core';
import { Ingredient } from '../../models/ingredient/ingredient.model';

@Component({
  selector: 'app-ingredient-component',
  imports: [],
  templateUrl: './ingredient-component.html',
  styleUrl: './ingredient-component.scss',
})
export class IngredientComponent {
  @Input() ingredient!: Ingredient;

}
