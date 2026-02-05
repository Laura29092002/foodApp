import { Component, OnInit, OnDestroy } from '@angular/core';
import { Day } from '../../models/day/day.model';
import { DayService } from '../../services/day/day';
import { Observable, Subject, takeUntil } from 'rxjs';
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
import { Location } from '@angular/common';
import * as PlanningSelectors from '../../store/planning-store/planning-store.selectors';
import * as PlanningActions from '../../store/planning-store/planning-store.actions';
import { Store } from '@ngrx/store';
import { User } from '../../models/user/step.model';
import { UserService } from '../../services/user/user';
import { RecipeService } from '../../services/recipe/recipe';
import { Recipe } from '../../models/recipe/recipe.model';

@Component({
  selector: 'app-create-planning-page',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, CommonModule, RecipeDayCard], 
  templateUrl: './create-planning-page.html',
  styleUrl: './create-planning-page.scss',
})
export class CreatePlanningPage implements OnInit, OnDestroy {
  days$: Observable<Day[]>;
  days: Day[] = [];
  private destroy$ = new Subject<void>();
  user : User | null = null;
  preferenceRecipe: Recipe[] = [];

  constructor(
    private dayService: DayService,
    private router: Router,
    private _location: Location,
    private store: Store,
    private userService : UserService,
    private recipeService : RecipeService
  ) {
    this.days$ = this.store.select(PlanningSelectors.selectDaysList);
  }

  ngOnInit() {

    this.userService.currentUser.subscribe(data =>{ this.user = data});
    
    // Charger seulement si le store est vide
    this.store.dispatch(PlanningActions.loadDaysIfEmpty());
    
    this.days$.pipe(takeUntil(this.destroy$)).subscribe(days => {
      // Copie profonde pour permettre le drag & drop
      this.days = this.deepCopyDays(days);
      console.log('Days updated from store:', this.days);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Méthode pour créer une copie profonde des jours
  private deepCopyDays(days: Day[]): Day[] {
    return days.map(day => ({
      ...day,
      listOfRecipe: day.listOfRecipe ? [...day.listOfRecipe] : []
    }));
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
    
    // Mettre à jour le store
    this.store.dispatch(PlanningActions.modifPlanning({ days: this.days }));
  }

  onCancel() {
    if(confirm("Etes-vous sûr de vouloir annuler? Vos changements ne seront pas sauvegardés.")){
      this._location.back();
    }
  }

  onUpdate() {
      const updatedDays = this.days.map(day => {
        const dayToUpdate = { ...day };
        if(dayToUpdate.recipeLunchId){
          dayToUpdate.recipeLunchId = day.listOfRecipe![0].id;
        }
        if(dayToUpdate.recipeDinnerId){
          dayToUpdate.recipeDinnerId = day.listOfRecipe![1].id;
        }
        return dayToUpdate;
      });

      this.store.dispatch(PlanningActions.modifPlanning({ days: updatedDays }));

      updatedDays.forEach(day => {
        const dayToSave: Day = {
          id: day.id, 
          name: day.name, 
          userId: day.userId,
          recipeLunchId: day.recipeLunchId, 
          recipeDinnerId: day.recipeDinnerId
        };
        if(dayToSave.recipeLunchId == 0){
          dayToSave.recipeLunchId = undefined;
        }
        this.dayService.updateDay(dayToSave).subscribe((data) => {
          console.log('Day updated:', data);
        });
      });
      
      this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home']);
      });
   
  }


  addLunchRecipe(dayId: number) {
    this.store.dispatch(PlanningActions.startRecipeSelection({ 
      dayId, 
      mealType: 'lunch' 
    }));
    this.router.navigate(["/recipes-select"]);
  }

  addDinnerRecipe(dayId: number) {
    this.store.dispatch(PlanningActions.startRecipeSelection({ 
      dayId, 
      mealType: 'dinner' 
    }));
    this.router.navigate(["/recipes-select"]);
  }


  modifyRecipe(dayId: number, mealType: 'lunch' | 'dinner') {
    this.store.dispatch(PlanningActions.startRecipeSelection({ 
      dayId, 
      mealType 
    }));
    this.router.navigate(["/recipes-select"]);
  }

  

  generate(){
    if(this.user?.regimeId && this.user.regimeId!=5){
      this.recipeService.getRecipeByPreference(this.user.regimeId).subscribe(
        data => {
          this.preferenceRecipe = data;
          console.log(this.preferenceRecipe);
          this.modifyByGenerate();
        }

      );
      

    }else{
      console.log("User:" ,this.user);
      this.recipeService.getRecipes().subscribe(
        data =>{
          this.preferenceRecipe = data;
          this.modifyByGenerate();
        }
      )
    }
  }

  modifyByGenerate(){
    let i = 0;
    this.days.map(day=>{
      console.log(this.preferenceRecipe[i])
      if(this.preferenceRecipe[i]){
        day.recipeLunchId = this.preferenceRecipe[i].id
        day.listOfRecipe![0] = this.preferenceRecipe[i]
      }else{
        day.recipeLunchId = undefined
        day.listOfRecipe![0] = new Recipe(0,"","")
      }
      i++;
      if(this.preferenceRecipe[i]){
        day.recipeDinnerId = this.preferenceRecipe[i].id
        day.listOfRecipe![1] = this.preferenceRecipe[i]
      }else{
        day.recipeDinnerId = undefined
        day.listOfRecipe![1] = new Recipe(0,"","")
      }
      i++;
    })
  
    console.log(this.days);
    this.store.dispatch(PlanningActions.modifPlanning({ days: this.days }));
  }

}