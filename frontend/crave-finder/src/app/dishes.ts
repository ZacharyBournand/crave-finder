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
      description: 'Fettucini pasta served with creamy alfredo sauce and grilled chicken. An Italian classic.'
    },
    {
      id: 2,
      name: 'Just Bread',
      price: 2.99,
      description: 'Munch munch munch... mmmmmmmm'
    },
    {
      id: 3,
      name: 'Chicken Stock',
      price: 99.99,
      description: "BONE Water"
    }
  ];