export type Product = {
  label: string;
  price: number;
  quantity: number;
};

export type CartProduct = {
  products: Product[];
};
