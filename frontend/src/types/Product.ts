export interface ProductType {
    _id: string;
    name: string;
    price: number;
    material: string;
    color: string[];
    images: string[];
    description: string;
    specification: string;
    category?: string;
    isAvailable?: boolean;
    quantity: number;
    relatedProducts?: ProductType[];
    createdAt: string;
    updatedAt: string;
}