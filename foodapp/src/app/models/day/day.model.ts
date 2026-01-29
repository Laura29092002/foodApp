import { Recipe } from "../recipe/recipe.model";

export class Day {
    id: number;
    name: string;
    userId: number;
    recipeLunchId?: number;
    recipeDinnerId?: number;
    listOfRecipe?: Recipe[];

    constructor(id: number, name: string,userId: number, listOfRecipe: Recipe[], recipeLunchId?: number, recipeDinnerId?: number) {
        this.id = id;
        this.name = name;
        this.recipeLunchId = recipeLunchId;
        this.userId = userId;
        this.recipeDinnerId = recipeDinnerId;
        this.listOfRecipe = listOfRecipe;
    }
}
