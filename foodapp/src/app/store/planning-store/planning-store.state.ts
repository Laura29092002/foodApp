import { Day } from "../../models/day/day.model";
import { Recipe } from "../../models/recipe/recipe.model";

export interface PlanningState{
    daysList: Day[];
    recipeList: Recipe[];
    loading: boolean;
    selectionContext: {
        dayId: number;
        mealType: 'lunch' | 'dinner';
        isSelecting: boolean;
    } | null;
}

export const daysInitialState: PlanningState = {
    daysList: [],
    recipeList: [],
    loading: true,
    selectionContext: null
}