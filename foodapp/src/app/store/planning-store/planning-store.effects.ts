// planning-store.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, forkJoin } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import * as PlanningActions from './planning-store.actions';
import * as PlanningSelectors from './planning-store.selectors';
import { DayService } from '../../services/day/day';
import { RecipeService } from '../../services/recipe/recipe';
import { Day } from '../../models/day/day.model';
import { Recipe } from '../../models/recipe/recipe.model';

@Injectable()
export class PlanningEffects {
  private actions$ = inject(Actions);
  private dayService = inject(DayService);
  private recipeService = inject(RecipeService);
  private store = inject(Store);

  // Charger seulement si le store est vide
  loadDaysIfEmpty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanningActions.loadDaysIfEmpty),
      withLatestFrom(this.store.select(PlanningSelectors.selectDaysList)),
      filter(([_, days]) => days.length === 0),
      map(() => PlanningActions.loadDays())
    )
  );

  // Effect de chargement principal
  loadDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanningActions.loadDays),
      switchMap(() =>
        this.dayService.getDays().pipe(
          switchMap(days => {
            days.sort((a, b) => a.id - b.id);
            
            const daysWithRecipeIds = days.filter(day => day.recipeLunchId && day.recipeDinnerId);
            
            if (daysWithRecipeIds.length === 0) {
              return of(PlanningActions.loadDaysSuccess({ 
                days: days.map(day => ({ ...day, listOfRecipe: [] })) 
              }));
            }
            
            const daysWithRecipes$ = days.map(day => {
                return forkJoin({
                  lunch: (day.recipeLunchId? this.recipeService.getRecipeById(day.recipeLunchId) : of(new Recipe(0,'',''))),
                  dinner: (day.recipeDinnerId? this.recipeService.getRecipeById(day.recipeDinnerId) : of(new Recipe(0,'','')))
                }).pipe(
                  map(({ lunch, dinner }) => ({
                    ...day,
                    listOfRecipe: [lunch, dinner]
                  })),
                  catchError(error => {
                    console.error(`Error loading recipes for day ${day.id}:`, error);
                    return of({ ...day, listOfRecipe: [] });
                  })
                );
              
            });
            
            return forkJoin(daysWithRecipes$).pipe(
              map((daysWithRecipes: Day[]) => {
                console.log('Days loaded with recipes:', daysWithRecipes);
                return PlanningActions.loadDaysSuccess({ days: daysWithRecipes });
              })
            );
          }),
          catchError((error) => {
            console.error('Error loading days:', error);
            return of(PlanningActions.loadDaysFailure());
          })
        )
      )
    )
  );
}