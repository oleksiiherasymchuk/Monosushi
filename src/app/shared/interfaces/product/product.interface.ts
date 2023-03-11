import { ICategoryResponse } from "../category/category.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    name: string;
    path: string;
    ingredients: string;
    weight: string;
    price: number;
    imagePath: string;
    // description: string;
    // proteins: number;
    // carbohydrates: number;
    // fat: number;
    // calories: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}