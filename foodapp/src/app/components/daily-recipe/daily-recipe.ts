import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe/recipe.model';
import { DayService } from '../../services/day/day';
import { UserService } from '../../services/user/user';
import { User } from '../../models/user/step.model';
import { Day } from '../../models/day/day.model';
import { RecipeService } from '../../services/recipe/recipe';
import { forkJoin, of } from 'rxjs';
import { DetailRecipeCard } from "../detail-recipe-card/detail-recipe-card";

@Component({
  selector: 'app-daily-recipe',
  imports: [DetailRecipeCard],
  templateUrl: './daily-recipe.html',
  styleUrl: './daily-recipe.scss',
})
export class DailyRecipe implements OnInit{
  day : Day | null = null;
  user : User | null = null;
  currentRecipe : Recipe | null = null;
  isLunch : boolean = false;
  name : "midi" | "soir" = "midi";
  
  constructor(private dayService: DayService, private userService: UserService, private recipeService : RecipeService){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      data => {
        this.user = data;
        this.dayService.getCurrentDay(this.user!.id).subscribe(
          date => {
            this.day = date; 
            this.day.listOfRecipe = [];
            forkJoin({
              lunch: (this.day.recipeLunchId? this.recipeService.getRecipeById(this.day.recipeLunchId) : of(new Recipe(0,'',''))),
              dinner: (this.day.recipeDinnerId? this.recipeService.getRecipeById(this.day.recipeDinnerId) : of(new Recipe(0,'','')))
            }).subscribe(({ lunch, dinner }) => {
              
              let dateTime = new Date().getHours();
              this.day!.listOfRecipe = [lunch, dinner];
              if(dateTime <= 12){
                this.currentRecipe = this.day!.listOfRecipe[0];
                this.name = "midi";
              }else{
                this.currentRecipe = this.day!.listOfRecipe[1];
                this.name = "soir";
              }

              
            });
          }
        )
      }
    )
    
  }

  changeRecipe(){
    this.currentRecipe!.id == this.day?.recipeLunchId ? this.currentRecipe = this.day.listOfRecipe![1] : this.currentRecipe = this.day!.listOfRecipe![0];
    this.isLunch = !this.isLunch;
    this.name == "midi" ? this.name = "soir" : this.name = "midi";
  }
}
