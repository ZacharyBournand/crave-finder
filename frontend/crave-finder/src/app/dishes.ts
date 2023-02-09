export interface Dish {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
  }
  
  export const dishes = [
    {
      id: 1,
      name: 'Chicken Alfredo',
      price: 10.99,
      description: 'Fettuccine pasta served with creamy alfredo sauce and grilled chicken. An Italian classic.',
      rating: 0
    },
    {
      id: 2,
      name: 'Just Bread',
      price: 2.99,
      description: 'Munch munch munch... mmmmmmmm',
      rating: 0
    },
    {
      id: 3,
      name: 'Chicken Stock',
      price: 99.99,
      description: "BONE Water",
      rating: 0
    }
  ];