import { Component } from '@angular/core';
import { IngredientsDashboard } from "../../components/ingredients-dashboard/ingredients-dashboard";
import { RecipesDashboard } from "../../components/recipes-dashboard/recipes-dashboard";

@Component({
  selector: 'app-settings-page',
  imports: [IngredientsDashboard, RecipesDashboard],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {

  constructor(){
  }

}
