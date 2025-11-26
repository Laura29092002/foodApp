import { Ingredient } from "../ingredient/ingredient.model";

export class Category {
    id: number;
    name: string;
    unit: string;
    ingredients?: Ingredient[];

    constructor(id: number, name: string, unit: string) {
        this.id = id;
        this.name = name;
        this.unit = unit;
    }
}
