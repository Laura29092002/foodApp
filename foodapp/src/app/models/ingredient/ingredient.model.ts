export class Ingredient {
    id: number;
    name: string;
    quantity?: number;
    image?: string;
    category_id?: string;

    constructor(id: number, name: string, quantity: number, image?: string, category_id?: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.category_id = category_id;
    }
}
