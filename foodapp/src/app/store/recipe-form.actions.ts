import { createAction, props } from '@ngrx/store';
import { Recipe } from '../models/recipe/recipe.model';
import { Step } from '../models/step/step.model';
import { Ingredient } from '../models/ingredient/ingredient.model';

// Actions pour la partie Recette
export const saveRecetteData = createAction(
  '[Recipe Form] Save Recette Data',
  props<Recipe>()
);

// Actions pour les ingrédients
export const saveIngredientsData = createAction(
  '[Recipe Form] Save Ingredients Data',
  props<{ ingredients: Ingredient[] }>()
);

export const addIngredient = createAction(
  '[Recipe Form] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const updateIngredient = createAction(
  '[Recipe Form] Update Ingredient',
  props<{ index: number; ingredient: Ingredient }>()
);

export const removeIngredient = createAction(
  '[Recipe Form] Remove Ingredient',
  props<{ index: number }>()
);

// Actions pour les étapes
export const saveStepsData = createAction(
  '[Recipe Form] Save Steps Data',
  props<{ steps: Step[] }>()
);

export const addStep = createAction(
  '[Recipe Form] Add Step',
  props<{ step: Step }>()
);

export const updateStep = createAction(
  '[Recipe Form] Update Step',
  props<{ index: number; step: Step }>()
);

export const removeStep = createAction(
  '[Recipe Form] Remove Step',
  props<{ index: number }>()
);

export const reorderSteps = createAction(
  '[Recipe Form] Reorder Steps',
  props<{ steps: Step[] }>()
);

// Actions globales
export const resetForm = createAction('[Recipe Form] Reset Form');

export const submitRecipe = createAction('[Recipe Form] Submit Recipe');

export const submitRecipeSuccess = createAction(
  '[Recipe Form] Submit Recipe Success',
  props<{ recipeId: number }>()
);

export const submitRecipeFailure = createAction(
  '[Recipe Form] Submit Recipe Failure',
  props<{ error: string }>()
);