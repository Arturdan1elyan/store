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


export type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
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

export type OrderContextType = {
  orders: Order[];
  handleAddToCart: (product: Product) => void;
  handleUpdate: (id: number, sum: number) => void;
  handleDelete: (id: number) => void;
};

export type Name = {
  firstName: string;
  lastName: string
};

export type Geolocation = {
  lat: string;
  long: string;
}

export type Address = {
  city: string;
  street: string;
  number: number;
  zipcode: number;
  geolocation: Geolocation
}

export type User = {
  id: number;
  email: string;
  userName: string;
  password: string;
  phone?: string;
  name?: Name;
  address?: Address
};

export type UserContextType = {
  users: User[];
  error: string | null;
  getUsers: () => void;
  postNewUser: (user: User) => void;
  deleteUser: (id: number) => void
}




export type ProductPageParams = {
  params: Promise<{ id: string }>;
};
