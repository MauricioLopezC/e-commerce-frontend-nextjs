export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  verifiedEmail: boolean;
  role: string;
  isBanned: boolean;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
  totalSpent?: number;
  totalOrders?: number;
}
