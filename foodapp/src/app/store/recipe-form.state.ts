
import { Ingredient } from "../models/ingredient/ingredient.model";
import { Recipe } from "../models/recipe/recipe.model";
import { Step } from "../models/step/step.model";


export interface RecipeFormState {
  recetteData: Partial<Recipe>;
  ingredientsData: Ingredient[];
  stepsData: Step[];
  currentStep: number;
  isSubmitting: boolean;
  error: string | null;
}

export const initialRecipeFormState: RecipeFormState = {
  recetteData: {},
  ingredientsData: [],
  stepsData: [],
  currentStep: 1,
  isSubmitting: false,
  error: null
};