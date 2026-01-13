import { createReducer, on } from "@ngrx/store";
import {daysInitialState} from "./planning-store.state"
import { cancelRecipeSelection, loadDays, loadDaysFailure, loadDaysSuccess, modifPlanning, removeRecipeFromDay, setRecipeToDay, startRecipeSelection } from "./planning-store.actions";

export const daysReducer =  createReducer(
    daysInitialState,
    on(loadDays, state => ({
        ...state,
        loading: true
    })),
    on(loadDaysSuccess, (state, {days}) => ({
        ...state,
        daysList: days,
        loading: false
    })),
    on(loadDaysFailure, state => ({
        ...state,
        loading: false
    })),

    


    on(startRecipeSelection, (state, {dayId, mealType}) =>({
        ...state,
        selectionContext: {
            dayId,
            mealType,
            isSelecting: true
        }
    })),

    on(cancelRecipeSelection, state => ({
        ...state,
        selectionContext: null
    })),

    on(setRecipeToDay, (state, {recipe}) => {
    if (!state.selectionContext) return state;

    const { dayId, mealType } = state.selectionContext;
    
    const updatedDays = state.daysList.map(day => {
        if (day.id !== dayId) return day;

        // Créer une nouvelle instance de Day avec les modifications
        const updatedDay = { ...day };
        
        // Mettre à jour l'ID de la recette selon le type de repas
        if (mealType === 'lunch') {
            updatedDay.recipeLunchId = recipe.id;
        } else {
            updatedDay.recipeDinnerId = recipe.id;
        }

        // Gérer la liste des recettes
        let updatedRecipeList = [...(day.listOfRecipe || [])];

        if(mealType == 'lunch'){
            updatedRecipeList[0] = recipe;
        }else{
            updatedRecipeList[1] = recipe;
        }
        
        updatedDay.listOfRecipe = updatedRecipeList;

        return updatedDay;
    });

    return {
        ...state,
        daysList: updatedDays,
        selectionContext: null // Réinitialiser après sélection
    };
}),

    // Dans planning-store.reducer.ts

on(removeRecipeFromDay, (state, { dayId, mealType }) => {
    const updatedDays = state.daysList.map(day => {
        if (day.id !== dayId) return day;

        const updatedDay = { ...day };
        
        // Récupérer l'ID de la recette à supprimer
        const recipeIdToRemove = mealType === 'lunch' 
            ? day.recipeLunchId 
            : day.recipeDinnerId;

        console.log(recipeIdToRemove);
        
        // Réinitialiser l'ID du repas
        if (mealType === 'lunch') {
            updatedDay.recipeLunchId = undefined;
        } else {
            updatedDay.recipeDinnerId = undefined;
        }
        
        // Supprimer la recette de la liste SEULEMENT si elle n'est pas utilisée par l'autre repas
        if (recipeIdToRemove) {
            const otherMealRecipeId = mealType === 'lunch' 
                ? day.recipeDinnerId 
                : day.recipeLunchId;
            
            if (recipeIdToRemove !== otherMealRecipeId) {
                updatedDay.listOfRecipe = (day.listOfRecipe || []).filter(
                    r => r.id !== recipeIdToRemove
                );
            } else {
                // Si la recette est utilisée pour les deux repas, on garde la liste telle quelle
                updatedDay.listOfRecipe = day.listOfRecipe;
            }
        }

        return updatedDay;
    });

    return {
        ...state,
        daysList: updatedDays
    };
}),
    on(modifPlanning, (state, { days }) => ({
        ...state,
        daysList: days
    }))

);

