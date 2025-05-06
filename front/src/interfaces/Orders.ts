import IProducts from "./Products";
import IUsers from "./Users";

export interface IOrder {
  token: string;
  product_id: number[];
}

export interface IOrders {
  status: string;
  date: string;
  user: IUsers;
  products: IProducts[];
  id: number;
}

export default IOrder;
