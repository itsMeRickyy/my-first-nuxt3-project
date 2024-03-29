// export interface Product {
//   id: number;
//   title: string;
//   image: string;
//   price: number;
//   category: string;
//   description: string;
//   quantity: number;
//   rating: {
//     rate: number;
//     count: number;
//   };
//   handleAddToCart: () => void;
// }
export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
  handleAddToCart: () => void;
};

export type ProductDetail = Product[];
