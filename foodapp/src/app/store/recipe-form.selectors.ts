import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeFormState } from './recipe-form.state';

export const selectRecipeFormState =
  createFeatureSelector<RecipeFormState>('recipeForm');

// Selectors pour la recette
export const selectRecetteData = createSelector(
  selectRecipeFormState,
  (state) => state.recetteData
);

// Selectors pour les ingrédients
export const selectIngredientsData = createSelector(
  selectRecipeFormState,
  (state) => state.ingredientsData
);

export const selectIngredientsCount = createSelector(
  selectIngredientsData,
  (ingredients) => ingredients.length
);

// Selectors pour les étapes
export const selectStepsData = createSelector(
  selectRecipeFormState,
  (state) => state.stepsData
);

export const selectStepsCount = createSelector(
  selectStepsData,
  (steps) => steps.length
);


// Selectors de navigation
export const selectCurrentStep = createSelector(
  selectRecipeFormState,
  (state) => state.currentStep
);

// Selector pour toutes les données
export const selectCompleteRecipe = createSelector(
  selectRecetteData,
  selectIngredientsData,
  selectStepsData,
  (recette, ingredients, steps) => ({
    recette,
    ingredients,
    steps
  })
);




