export interface IDiscount {
    id: number;
    name: string,
    title: string,
    description: string;
    imagePath: string;
}

export interface IDiscountRequest {
    name: string,
    title: string,
    description: string;
    imagePath: string;
}

export interface IDiscountResponse extends IDiscountRequest {
    id: number;
}