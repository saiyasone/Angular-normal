export interface Product {
  id: number;
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  note: string;
  userId: {
    _id: string;
  };
}
