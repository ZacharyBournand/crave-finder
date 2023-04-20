export interface Dish {
    name: string;
    price: string;
    description: string;
}

export interface Location {
    Address1: string;
    Address2: string;
    City:     string;
    State:    string;
    ZipCode:  string;
}


export interface Restaurant {
    id: number;
    name: string;
    location: Location[];
    rating: Float32Array;
    price: string;
    service: string;
    food: string;
    dishes: Dish[];
}