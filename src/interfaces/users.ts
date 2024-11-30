import { Order } from "./orders";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  order: Order[];
}
