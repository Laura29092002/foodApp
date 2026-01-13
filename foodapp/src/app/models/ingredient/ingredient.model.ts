export class Ingredient {
    id: number;
    name: string;
    unit?: string;
    quantity?: number;
    image?: string;
    categoryId?: string;

    constructor(id: number, name: string, image?: string, categoryId?: string, unit?: string) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.image = image;
        this.categoryId = categoryId;
    }
}
