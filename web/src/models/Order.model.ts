import type { Book } from "./Book.model";

export interface OrderItem {
  book: Book;
  quantity: number;
  price: number; // Giá tại thời điểm đặt hàng
}

export interface UserInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export interface Order {
  id: string;
  orderDate: string;
  items: OrderItem[];
  userInfo: UserInfo;
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingFee: number;
  total: number;
}
