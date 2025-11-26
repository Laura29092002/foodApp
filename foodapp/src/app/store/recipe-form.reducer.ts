import { createReducer, on } from '@ngrx/store';
import { initialRecipeFormState } from './recipe-form.state';
import * as RecipeFormActions from './recipe-form.actions';

export const recipeFormReducer = createReducer(
  initialRecipeFormState,

  // Recette
  on(RecipeFormActions.saveRecetteData, (state, recette ) => ({
    ...state,
    recetteData: { ...state.recetteData, ...recette}
  })),

  // Ingrédients - SAVE (remplace complètement la liste)
  on(RecipeFormActions.saveIngredientsData, (state, { ingredients }) => ({
    ...state,
    ingredientsData: [...ingredients]
  })),

  // Ingrédients - ADD (ajoute un ingrédient)
  on(RecipeFormActions.addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredientsData: [...state.ingredientsData, ingredient]
  })),

  // Ingrédients - UPDATE (modifie un ingrédient)
  on(RecipeFormActions.updateIngredient, (state, { index, ingredient }) => ({
    ...state,
    ingredientsData: state.ingredientsData.map((item, i) =>
      i === index ? ingredient : item
    )
  })),

  // Ingrédients - REMOVE (supprime un ingrédient)
  on(RecipeFormActions.removeIngredient, (state, { index }) => ({
    ...state,
    ingredientsData: state.ingredientsData.filter((_, i) => i !== index)
  })),

  // Étapes - SAVE (remplace complètement la liste)
  on(RecipeFormActions.saveStepsData, (state, { steps }) => ({
    ...state,
    stepsData: [...steps]
  })),

  // Étapes - ADD (ajoute une étape)
  on(RecipeFormActions.addStep, (state, { step }) => ({
    ...state,
    stepsData: [...state.stepsData, step]
  })),

  // Étapes - UPDATE (modifie une étape)
  on(RecipeFormActions.updateStep, (state, { index, step }) => ({
    ...state,
    stepsData: state.stepsData.map((item, i) =>
      i === index ? step : item
    )
  })),

  // Étapes - REMOVE (supprime une étape)
  on(RecipeFormActions.removeStep, (state, { index }) => ({
    ...state,
    stepsData: state.stepsData.filter((_, i) => i !== index)
  })),

  // Étapes - REORDER (réorganise les étapes)
  on(RecipeFormActions.reorderSteps, (state, { steps }) => ({
    ...state,
    stepsData: steps.map((step, index) => ({ ...step, ordre: index + 1 }))
  })),

  // Soumission
  on(RecipeFormActions.submitRecipe, (state) => ({
    ...state,
    isSubmitting: true,
    error: null
  })),

  on(RecipeFormActions.submitRecipeSuccess, (state) => ({
    ...initialRecipeFormState
  })),

  on(RecipeFormActions.submitRecipeFailure, (state, { error }) => ({
    ...state,
    isSubmitting: false,
    error
  })),

  // Reset
  on(RecipeFormActions.resetForm, () => initialRecipeFormState)
);