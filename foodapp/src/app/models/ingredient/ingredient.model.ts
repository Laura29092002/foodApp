export class Ingredient {
    id: number;
    name: string;
    quantity?: number;
    image?: string;
    categoryId?: string;

    constructor(id: number, name: string, image?: string, categoryId?: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.categoryId = categoryId;
    }
}
