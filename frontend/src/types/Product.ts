export interface ProductType {
    _id: string;
    name: string;
    price: number;
    material: string;
    color: string;
    size: string;
    images: string[];
    favourites: boolean;
    description?: string;
    specification?: string;
    category?: string;
    isAvailable?: boolean;
}