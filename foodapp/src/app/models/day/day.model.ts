import { Recipe } from "../recipe/recipe.model";

export class Day {
    id: number;
    name: string;
    recipeLunchId?: number;
    recipeDinnerId?: number;
    listOfRecipe?: Recipe[];

    constructor(id: number, name: string, listOfRecipe: Recipe[], recipeLunchId?: number, recipeDinnerId?: number) {
        this.id = id;
        this.name = name;
        this.recipeLunchId = recipeLunchId;
        this.recipeDinnerId = recipeDinnerId;
        this.listOfRecipe = listOfRecipe;
    }
}
