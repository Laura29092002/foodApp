import { Component } from '@angular/core';
import { IngredientsDashboard } from "../../components/ingredients-dashboard/ingredients-dashboard";
import { RecipesDashboard } from "../../components/recipes-dashboard/recipes-dashboard";
import { UserDashboard } from "../../components/user-dashboard/user-dashboard";

@Component({
  selector: 'app-settings-page',
  imports: [IngredientsDashboard, RecipesDashboard, UserDashboard],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {

  constructor(){
  }

}
