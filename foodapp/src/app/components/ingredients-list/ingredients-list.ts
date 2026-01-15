import { Component, Input } from '@angular/core';
import { Ingredient } from '../../models/ingredient/ingredient.model';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-ingredients-list',
  imports: [MatCheckboxModule],
  templateUrl: './ingredients-list.html',
  styleUrl: './ingredients-list.scss',
})
export class IngredientsList {
  @Input() ingredient!: Ingredient;

}
