// ============= Sequelize ==============
// export interface Cart {
//   id: number;
//   userId: number;
//   products: ProductCartItem[];
// }

// export interface ProductCartItem {
//   title: string;
//   imageUrl: string;
//   price: number;
//   cartItem: CartItem;
// }

// export interface CartItem {
//   id: number;
//   cartId: number;
//   productId: number;
//   quantity: number;
// }

// ============= Mongo DB ==============
// export interface Cart {
//   _id: string;
//   title: string;
//   imageUrl: string;
//   price: number;
//   note: string;
//   userId: string;
//   quantity: number;
// }

// ============= Mongoose ==============
export interface Cart {
  productId: {
    _id: string;
    title: string;
    imageUrl: string;
    price: number;
    note: string;
    userId: string;
  };
  quantity: number;
  // cartId
  _id: string;
}
