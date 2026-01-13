import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlanningState } from "./planning-store.state";

export const selectDaysState = createFeatureSelector<PlanningState>('days');

export const selectDaysList = createSelector(
    selectDaysState, 
    (state: PlanningState) => state.daysList
);

export const selectDaysLoading = createSelector(
    selectDaysState,
    (state: PlanningState) => state.loading
);

export const selectSelectionContext = createSelector(
    selectDaysState,
    (state: PlanningState) => state.selectionContext
);

export const selectIsSelecting = createSelector(
    selectSelectionContext,
    (context) => context?.isSelecting || false
);

// Sélecteur pour obtenir un jour spécifique
export const selectDayById = (dayId: number) => createSelector(
    selectDaysList,
    (days) => days.find(day => day.id === dayId)
);

// Sélecteur pour obtenir la recette d'un repas spécifique
export const selectRecipeForMeal = (dayId: number, mealType: 'lunch' | 'dinner') => 
    createSelector(
        selectDayById(dayId),
        (day) => {
            if (!day) return null;
            const recipeId = mealType === 'lunch' ? day.recipeLunchId : day.recipeDinnerId;
            return day.listOfRecipe?.find(r => r.id === recipeId) || null;
        }
    );