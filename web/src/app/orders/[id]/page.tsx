import type { Metadata } from "next";
import OrderDetailContainer from "~/components/orders/OrderDetailContainer";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng | VASK Book Store",
  description:
    "Xem chi tiết đơn hàng tại VASK Book Store, nơi mua sắm sách trực tuyến hàng đầu Việt Nam",
};

export default function OrderDetailPage({
  params,
}: { params: { id: string } }) {
  return <OrderDetailContainer orderId={params.id} />;
}
