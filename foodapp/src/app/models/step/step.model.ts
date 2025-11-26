export class Step {
    id: number;
    number: number;
    description: string;
    recipeId: number;

    constructor(id: number, number: number, description: string, recipeId: number) {
        this.id = id;
        this.number = number;
        this.description = description;
        this.recipeId = recipeId;
    }
}
