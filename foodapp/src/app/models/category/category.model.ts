import { Ingredient } from "../ingredient/ingredient.model";

export class Category {
    id: number;
    name: string;
    ingredients?: Ingredient[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
