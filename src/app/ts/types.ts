export type FormField = {
  accessor: string;
  value: string;
  isValid: boolean;
  type: string;
  label: string;
  pattern?: RegExp;
};

export type Form = FormField[];

export type FormInputChangeEventValues = {
  value: string;
  accessor?: string;
  isValid: boolean;
};

export type Product = {
  label: string;
  price: number;
  quantity: number;
};

export type CartProduct = {
  products: Product[];
};
