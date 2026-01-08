import { Component } from '@angular/core';
import { Day } from '../../models/day/day.model';
import { DayService } from '../../services/day/day';
import { RecipeService } from '../../services/recipe/recipe';

import { forkJoin } from 'rxjs';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup, 
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeDayCard } from "../../components/recipe-day-card/recipe-day-card";
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-planning-page',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, CommonModule, RecipeDayCard], 
  templateUrl: './create-planning-page.html',
  styleUrl: './create-planning-page.scss',
})
export class CreatePlanningPage {
  days: Day[] = [];
  ismodify: string = "";


  constructor(
    private dayService: DayService, 
    private recipeService: RecipeService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.ismodify = this.router.url;
    console.log(this.ismodify);  
    if(this.ismodify == "/modify-planning"){
      this.dayService.getDays().subscribe(data => {
      data.sort((a, b) => a.id - b.id);
      data.forEach(day => {
        day.listOfRecipe = [];
      });
      this.days = data;

      data.forEach(day => {

        forkJoin({
          lunch: this.recipeService.getRecipeById(day.recipeLunchId!),
          dinner: this.recipeService.getRecipeById(day.recipeDinnerId!)
        }).subscribe(({ lunch, dinner }) => {
          day.listOfRecipe = [lunch, dinner];
        });

      });
      console.log(this.days)
    });
    }else{
      this.dayService.getDays().subscribe(data => {
        data.sort((a, b) => a.id - b.id);
        this.days = data;
      });
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, 
        event.previousIndex, 
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onCancel(){
    this._location.back();
  }
  

  onUpdate(){
    let isConform : boolean = true;
    for(let day of this.days){
      if(day.listOfRecipe!.length != 2){
        isConform = false;
      }
    }
    if(isConform == true){
      for(let day of this.days){
        if(day.recipeLunchId! != day.listOfRecipe![0].id || day.recipeDinnerId! != day.listOfRecipe![1].id){
          day.recipeLunchId = day.listOfRecipe![0].id;
          day.recipeDinnerId = day.listOfRecipe![1].id;
          const dayModify : Day = {
            id: day.id, 
            name: day.name, 
            recipeLunchId: day.recipeLunchId, 
            recipeDinnerId:day.recipeDinnerId};
          console.log(dayModify);
          this.dayService.updateDay(day).subscribe((data) =>{
            console.log(data)
          });
        }
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['']);
      });

    }else{
      alert('Le nombre de recette par jour est incorrecte, veuillez renseigner 2 recettes par jour');
    }
  }
}