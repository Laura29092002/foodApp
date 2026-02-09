import { Component } from '@angular/core';
import { Planning } from "../../components/planning/planning";
import { DailyRecipe } from "../../components/daily-recipe/daily-recipe";

@Component({
  selector: 'app-planning-page',
  imports: [Planning, DailyRecipe],
  templateUrl: './planning-page.html',
  styleUrl: './planning-page.scss',
})
export class PlanningPage {
}
