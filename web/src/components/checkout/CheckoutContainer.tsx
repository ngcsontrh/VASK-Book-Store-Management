"use client";

import { Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "~/stores/cartStore";
import NotificationSnackbar from "../cart/NotificationSnackbar";
import CheckoutBreadcrumbs from "./CheckoutBreadcrumbs";
import CheckoutItemsTable from "./CheckoutItemsTable";
import CheckoutPayment from "./CheckoutPayment";
import PaymentMethodButton from "./PaymentMethodButton";
import ShippingAddress from "./ShippingAddress";
import UserInfoDialog from "./UserInfoDialog";

export default function CheckoutContainer() {
  const router = useRouter();
  const allCartItems = useCartStore((state) => state.cartItems);
  const selectedIds = useCartStore((state) => state.selectedForCheckout);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearSelectedForCheckout = useCartStore(
    (state) => state.clearSelectedForCheckout,
  );

  // Lọc các mặt hàng đã được chọn để đặt hàng
  const cartItems = allCartItems.filter((item) =>
    selectedIds.includes(item.book.id),
  );

  // Thông tin người dùng
  const [userInfo, setUserInfo] = useState({
    fullName: "Nguyễn Văn A",
    phone: "0987654321",
    address: "123 Đường ABC",
    city: "TP. Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Nghé",
  });

  // State quản lý phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // State quản lý dialog thông tin
  const [userInfoDialogOpen, setUserInfoDialogOpen] = useState(false);

  // State loading khi đặt hàng
  const [loading, setLoading] = useState(false);

  // State thông báo
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const handleCloseSnack = () => {
    setIsSnackOpen(false);
    setSnackMessage("");
  };

  const handleOpenUserInfoDialog = () => {
    setUserInfoDialogOpen(true);
  };

  const handleCloseUserInfoDialog = () => {
    setUserInfoDialogOpen(false);
  };

  const handleSaveUserInfo = (newUserInfo: typeof userInfo) => {
    setUserInfo(newUserInfo);
    setUserInfoDialogOpen(false);
  };
  const handlePlaceOrder = async () => {
    setLoading(true);

    // Mô phỏng gửi đơn hàng lên server
    try {
      // Tạo đối tượng đơn hàng với thông tin đầy đủ
      const orderData = {
        items: cartItems,
        userInfo,
        paymentMethod,
        total:
          cartItems.reduce(
            (total, item) => total + item.book.price * item.quantity,
            0,
          ) + 30000, // tạm tính + phí ship
        orderDate: new Date().toISOString(),
      };

      console.log("Placing order:", orderData);

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Xóa các sản phẩm đã đặt khỏi giỏ hàng
      for (const id of selectedIds) {
        removeFromCart(id);
      }

      // Xóa danh sách sản phẩm được chọn để đặt hàng
      clearSelectedForCheckout();

      // Thông báo đặt hàng thành công
      setIsSnackOpen(true);
      setSnackMessage(
        "Đặt hàng thành công! Cảm ơn bạn đã sử dụng dịch vụ của VASK Book Store.",
      );
      setSnackSeverity("success");

      // Chuyển hướng về trang chủ sau 2 giây
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setIsSnackOpen(true);
      setSnackMessage("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.");
      setSnackSeverity("error");
    } finally {
      setLoading(false);
    }
  };

  // Chuyển hướng người dùng nếu không có sản phẩm được chọn để đặt hàng
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CheckoutBreadcrumbs />
        <NotificationSnackbar
          open={true}
          message="Không có sản phẩm nào được chọn để đặt hàng. Vui lòng quay lại giỏ hàng và chọn sản phẩm."
          onClose={() => {}}
          serverity="warning"
        />
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <CheckoutBreadcrumbs />

      {/* Thông tin địa chỉ giao hàng */}
      <ShippingAddress
        userInfo={userInfo}
        onEditClick={handleOpenUserInfoDialog}
      />

      {/* Bảng các sản phẩm */}
      <CheckoutItemsTable cartItems={cartItems} />

      {/* Phần thanh toán */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 4,
          mt: 4,
          width: "100%",
        }}
      >
        {" "}
        {/* Phương thức thanh toán - bên trái */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <PaymentMethodButton
            selectedMethod={paymentMethod}
            onChange={(method) => setPaymentMethod(method)}
          />
        </Box>
        {/* Thanh toán - bên phải */}
        <Box sx={{ width: { xs: "100%", md: "50%" }, display: "flex" }}>
          <CheckoutPayment
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            loading={loading}
            paymentMethod={paymentMethod}
            fullWidth
          />
        </Box>
      </Box>

      {/* Dialog thông tin người nhận */}
      <UserInfoDialog
        open={userInfoDialogOpen}
        userInfo={userInfo}
        onClose={handleCloseUserInfoDialog}
        onSave={handleSaveUserInfo}
      />

      <NotificationSnackbar
        open={isSnackOpen}
        message={snackMessage}
        onClose={handleCloseSnack}
        serverity={snackSeverity}
      />
    </Container>
  );
}
