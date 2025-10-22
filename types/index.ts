export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
};
export type Order = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
  quantity: number;
};

export type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export type OrderContextType = {
  orders: Order[];
  handleAddToCart: (product: Product) => void;
  handleUpdate: (id: number, sum: number) => void;
  handleDelete: (id: number) => void;
};

export type ProductPageParams = {
  params: Promise<{ id: string }>;
};
