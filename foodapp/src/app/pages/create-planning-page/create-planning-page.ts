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

@Component({
  selector: 'app-create-planning-page',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, CommonModule, RecipeDayCard], 
  templateUrl: './create-planning-page.html',
  styleUrl: './create-planning-page.scss',
})
export class CreatePlanningPage implements OnInit, OnDestroy {
  days$: Observable<Day[]>;
  days: Day[] = [];
  ismodify: string = "";
  private destroy$ = new Subject<void>();

  constructor(
    private dayService: DayService,
    private router: Router,
    private _location: Location,
    private store: Store
  ) {
    this.days$ = this.store.select(PlanningSelectors.selectDaysList);
  }

  ngOnInit() {
    this.ismodify = this.router.url;
    
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
    this._location.back();
  }

  onUpdate() {
    let isConform: boolean = true;
    
    for (let day of this.days) {
      if (!day.listOfRecipe || day.listOfRecipe.length != 2) {
        isConform = false;
        break;
      }
    }
    
    if (isConform) {
      const updatedDays = this.days.map(day => {
        const dayToUpdate = { ...day };
        dayToUpdate.recipeLunchId = day.listOfRecipe![0].id;
        dayToUpdate.recipeDinnerId = day.listOfRecipe![1].id;
        return dayToUpdate;
      });

      this.store.dispatch(PlanningActions.modifPlanning({ days: updatedDays }));

      updatedDays.forEach(day => {
        const dayToSave: Day = {
          id: day.id, 
          name: day.name, 
          recipeLunchId: day.recipeLunchId, 
          recipeDinnerId: day.recipeDinnerId
        };
        
        this.dayService.updateDay(dayToSave).subscribe((data) => {
          console.log('Day updated:', data);
        });
      });
      
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['']);
      });
    } else {
      alert('Le nombre de recette par jour est incorrect, veuillez renseigner 2 recettes par jour');
    }
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

  removeRecipe(dayId: number, mealType: 'lunch' | 'dinner') {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      this.store.dispatch(PlanningActions.removeRecipeFromDay({ dayId, mealType }));
    }
  }

}