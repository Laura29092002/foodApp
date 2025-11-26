import { Recipe } from "../recipe/recipe.model";

export class Day {
    id: number;
    name: string;
    recipeLunchId?: number;
    recipeDinnerId?: number;
    recipeLunch?: Recipe;
    recipeDinner?: Recipe;

    constructor(id: number, name: string, recipeLunchId?: number, recipeDinnerId?: number) {
        this.id = id;
        this.name = name;
        this.recipeLunchId = recipeLunchId;
        this.recipeDinnerId = recipeDinnerId;
    }
}
