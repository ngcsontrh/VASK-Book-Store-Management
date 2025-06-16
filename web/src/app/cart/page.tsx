import type { Metadata } from "next";
import CartContainer from "~/components/cart/CartContainer";

export const metadata: Metadata = {
  title: "Giỏ hàng | VASK Book Store",
  description:
    "Giỏ hàng của bạn tại VASK Book Store, nơi mua sắm sách trực tuyến hàng đầu Việt Nam",
};

export default function CartPage() {
  return <CartContainer />;
}
