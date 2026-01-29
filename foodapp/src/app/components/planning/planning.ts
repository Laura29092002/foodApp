import { Component, OnInit } from '@angular/core';
import { Day } from '../../models/day/day.model';
import { DayService } from '../../services/day/day';
import { RecipeCard } from "../../components/recipe-card/recipe-card";
import { RecipeService } from '../../services/recipe/recipe';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { Loader } from "../loader/loader";
import { Recipe } from '../../models/recipe/recipe.model';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';

@Component({
  selector: 'app-planning',
  imports: [RecipeCard, Loader],
  templateUrl: './planning.html',
  styleUrl: './planning.scss',
})
export class Planning implements OnInit {
  days: Day[] = [];
  isloading: Boolean = false;
  user : User | null = null;

  constructor(private dayService :DayService, private recipeService: RecipeService, private router: Router, private userService : UserService) {}

  ngOnInit() {
    this.isloading = true;
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
        this.dayService.getDaysByUserId(this.user!.id).subscribe(data => {
        data.sort((a, b) => a.id - b.id);
        data.forEach(day => {
          day.listOfRecipe = [];
        });
        this.days = data;
  
        data.forEach(day => {
          forkJoin({
            lunch: (day.recipeLunchId? this.recipeService.getRecipeById(day.recipeLunchId) : of(new Recipe(0,'',''))),
            dinner: (day.recipeDinnerId? this.recipeService.getRecipeById(day.recipeDinnerId) : of(new Recipe(0,'','')))
          }).subscribe(({ lunch, dinner }) => {
            day.listOfRecipe = [lunch, dinner];
          });
  
        });
        console.log(this.days)
        this.isloading = false;
      });
      }
    )
    
    }

  modifyPlanning(){
    this.router.navigate(['/modify-planning']);
  }


}
