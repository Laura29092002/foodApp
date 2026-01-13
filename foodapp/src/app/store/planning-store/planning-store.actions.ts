// planning-store.actions.ts
import { createAction, props } from "@ngrx/store";
import { Day } from "../../models/day/day.model";
import { Recipe } from "../../models/recipe/recipe.model";

// Charger les jours seulement si le store est vide
export const loadDaysIfEmpty = createAction('[Days] Load Days If Empty');

// Commencer le chargement des données
export const loadDays = createAction('[Days] Load Days');

// Succès du chargement des jours de la semaine
export const loadDaysSuccess = createAction(
    '[Days] Load Days Success',
    props<{days: Day[]}>()
);

// Erreur lors du chargement
export const loadDaysFailure = createAction('[Days] Load Days Failure');

// Initialiser le contexte de sélection
export const startRecipeSelection = createAction(
    '[Planning] Start Recipe Selection',
    props<{
        dayId: number;
        mealType: 'lunch' | 'dinner';
    }>()
);

// Annuler la sélection
export const cancelRecipeSelection = createAction(
    '[Planning] Cancel Recipe Selection'
);

// Définir la recette pour un repas
export const setRecipeToDay = createAction(
    '[Planning] Set Recipe To Day',
    props<{ recipe: Recipe }>()
);

// Retirer une recette d'un repas
export const removeRecipeFromDay = createAction(
    '[Planning] Remove Recipe From Day',
    props<{ dayId: number; mealType: 'lunch' | 'dinner' }>()
);

// Changer la place de la recette
export const modifPlanning = createAction(
    '[Day] planning modify',
    props<{days: Day[]}>()
);