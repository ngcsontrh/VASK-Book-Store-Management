import type { Metadata } from "next";
import CheckoutContainer from "~/components/checkout/CheckoutContainer";

export const metadata: Metadata = {
  title: "Đặt hàng | VASK Book Store",
  description:
    "Tiến hành đặt hàng tại VASK Book Store, nơi mua sắm sách trực tuyến hàng đầu Việt Nam",
};

export default function CheckoutPage() {
  return <CheckoutContainer />;
}
