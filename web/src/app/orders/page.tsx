import type { Metadata } from "next";
import OrdersContainer from "~/components/orders/OrdersContainer";

export const metadata: Metadata = {
  title: "Đơn hàng | VASK Book Store",
  description:
    "Xem đơn hàng của bạn tại VASK Book Store, nơi mua sắm sách trực tuyến hàng đầu Việt Nam",
};

export default function OrdersPage() {
  return <OrdersContainer />;
}
