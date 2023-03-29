export interface Dish {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    tags: Array<string>;
  }

export interface Category {
    id: number;
    name: string;
    dishes: Array<Dish>;
}

export interface Restaurant {
    id: number;
    name: string;
    rating1: number;
    rating2: number;
    rating3: number;
    categories: Array<Category>;
}
  
  export const restaurants : Restaurant[] = [
    {
        id: 1,
        name: 'CraveEats',
        rating1: 0,
        rating2: 0,
        rating3: 0,
        categories: 
        [
            {
                id: 1,
                name: 'Appetizers',
                dishes: 
                [
                    {
                        id: 1,
                        name: 'Calamari',
                        price: 6.99,
                        description: "Fried squid served with a marinara sauce.",
                        rating: 0,
                        tags: ['Seafood', 'Fried']
                    },
                    {
                        id: 2,
                        name: 'French Fries',
                        price: 3.99,
                        description: "Delicious and classic. Salty as fuck.",
                        rating: 0,
                        tags: ['Fried', 'Fastfood', 'Vegan (probably)']
                    },
                    {
                        id: 3,
                        name: 'Crab Rangoons',
                        price: 8.99,
                        description: 'These are so good no cap.',
                        rating: 0,
                        tags: ['Fried', 'Top tier']
                    },
                    {
                        id: 4,
                        name: 'Salad',
                        price: 3.99,
                        description: 'Buncha leafy greens.',
                        rating: 0,
                        tags: ['Vegan', 'Low calories', 'Healthy']
                    },
                    {
                        id: 5,
                        name: 'Salad2',
                        price: 3.99,
                        description: 'Buncha leafy greens.',
                        rating: 0,
                        tags: ['Vegan', 'Low calories', 'Healthy']
                    }

                ]
            },
            {
                id: 2,
                name: 'Soup',
                dishes: 
                [
                    {
                        id: 1,
                        name: 'Tomato Soup',
                        price: 4.99,
                        description: 'Tomato, but as a soup.',
                        rating: 0,
                        tags: ['Soup']
                    },
                    {
                        id: 2,
                        name: 'Clam Chowder',
                        price: 4.99,
                        description: 'Chowder, but with clams.',
                        rating: 0,
                        tags: ['Soup']
                    }
                ]
            },
            {
                id: 3,
                name: 'Entrees',
                dishes: 
                [
                    {
                        id: 1,
                        name: 'Steak',
                        price: 11.99,
                        description: 'Beefy...',
                        rating: 0,
                        tags: ['Meat']
                    },
                    {
                        id: 2,
                        name: 'Fried Chicken',
                        price: 9.99,
                        description: 'Chickeny...',
                        rating: 0,
                        tags: ['Meat']
                    }
                ]
            }
        ]
            
    },
    {
        id: 2,
        name: 'CraveEats2',
        rating1: 0,
        rating2: 0,
        rating3: 0,
        categories: 
        [
            {
                id: 1,
                name: 'Appetizers',
                dishes: 
                [
                    {
                        id: 1,
                        name: 'Cheese',
                        price: 6.99,
                        description: "Literally just a cheesewheel, like in Skyrim.",
                        rating: 0,
                        tags: ['Food']
                    },
                    {
                        id: 2,
                        name: 'French Fries',
                        price: 3.99,
                        description: "Delicious and classic. Salty as fuck.",
                        rating: 0,
                        tags: ['Food']
                    },
                    {
                        id: 3,
                        name: 'Crab Rangoons',
                        price: 8.99,
                        description: 'These are so good no cap.',
                        rating: 0,
                        tags: ['Food']
                    }

                ]
            },
            {
                id: 2,
                name: 'Soup',
                dishes: 
                [
                    {
                        id: 1,
                        name: 'Tomato Soup',
                        price: 4.99,
                        description: 'Tomato, but as a soup.',
                        rating: 0,
                        tags: ['Food']
                    },
                    {
                        id: 2,
                        name: 'Clam Chowder',
                        price: 4.99,
                        description: 'Chowder, but with clams.',
                        rating: 0,
                        tags: ['Food']
                    }
                ]
            },
            {
                id: 3,
                name: 'Entrees',
                dishes: 
                [
                    {
                        id: 1,
                        name: 'Steak',
                        price: 11.99,
                        description: 'Beefy...',
                        rating: 0,
                        tags: ['Food']
                    },
                    {
                        id: 2,
                        name: 'Fried Chicken',
                        price: 9.99,
                        description: 'Chickeny...',
                        rating: 0,
                        tags: ['Food']
                    }
                ]
            }
        ]
            
    }
  ];