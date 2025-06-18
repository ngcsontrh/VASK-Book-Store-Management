import type { Book } from "./Book.model";
import type { UserShippingInfo } from "./User.model";

export interface OrderItem {
  book: Book;
  quantity: number;
  price: number; // Giá tại thời điểm đặt hàng
}

export interface Order {
  id: string;
  orderDate: string;
  items: OrderItem[];
  userInfo: UserShippingInfo;
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingFee: number;
  total: number;
}