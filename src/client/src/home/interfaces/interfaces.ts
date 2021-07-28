export type overview = { items: number; totalPrice: number };

export type converter = { [key: string]: object[] };

export type accounts = Array<{
  _id: string;
  price: number;
  accountNumber: number;
  date: string;
  username: string;
}>;

export type productDetails = Array<{
  username: string;
  items: number;
  totalPrice: number;
  product: string;
}>;

export type displayObject = { display(products: any): void };
