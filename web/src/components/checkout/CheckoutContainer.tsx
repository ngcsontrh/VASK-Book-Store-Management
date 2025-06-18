"use client";

import { Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserShippingInfo } from "~/models/User.model";
import { useCartStore } from "~/stores/cartStore";
import { useOrderStore } from "~/stores/orderStore";
import NotificationModal from "../common/NotificationModal";
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
  
  // Flag to prevent warning during successful order redirection
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
  
  // Store redirect URL for navigating to order details after notification
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Lọc các mặt hàng đã được chọn để đặt hàng
  const cartItems = allCartItems.filter((item) =>
    selectedIds.includes(item.book.id),
  );

  // Thông tin người dùng
  const [userInfo, setUserInfo] = useState<UserShippingInfo>({
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
    
    // Nếu có URL chuyển hướng đang chờ, thực hiện chuyển hướng ngay khi người dùng đóng thông báo
    if (redirectUrl) {
      router.push(redirectUrl);
      setRedirectUrl(null); // Reset redirectUrl sau khi đã điều hướng
    }
  };

  const handleOpenUserInfoDialog = () => {
    setUserInfoDialogOpen(true);
  };

  const handleCloseUserInfoDialog = () => {
    setUserInfoDialogOpen(false);
  };

  const handleSaveUserInfo = (newUserInfo: UserShippingInfo) => {
    setUserInfo(newUserInfo);
    setUserInfoDialogOpen(false);
  };
  // Lấy phương thức thêm đơn hàng từ orderStore
  const { addOrder, setSelectedOrderId } = useOrderStore();

  const handlePlaceOrder = async () => {
    setLoading(true);

    // Mô phỏng gửi đơn hàng lên server
    try {
      // Tính tổng tiền hàng
      const subtotal = cartItems.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0
      );
      
      // Giả sử phí vận chuyển là 30.000đ
      const shippingFee = 30000;
      
      // Tạo đối tượng đơn hàng với thông tin đầy đủ
      const orderId = `ORD${Date.now().toString().slice(-10)}`;
      const order = {
        id: orderId,
        items: cartItems.map(item => ({
          book: item.book,
          quantity: item.quantity,
          price: item.book.price
        })),
        userInfo,
        paymentMethod,
        status: "pending" as const, // Trạng thái ban đầu: đang chờ xử lý (as const để TypeScript biết đây là literal type)
        subtotal,
        shippingFee,
        total: subtotal + shippingFee,
        orderDate: new Date().toISOString(),
      };

      console.log("Placing order:", order);
      
      // Đánh dấu đơn hàng thành công để tránh hiển thị cảnh báo
      setIsOrderSuccessful(true);
      
      // Lưu đơn hàng vào orderStore
      addOrder(order);
      setSelectedOrderId(orderId);

      // Xóa các sản phẩm khỏi giỏ hàng
      for (const id of selectedIds) {
        removeFromCart(id);
      }
      
      // Xóa danh sách sản phẩm được chọn để đặt hàng
      clearSelectedForCheckout();

      // Thông báo đặt hàng thành công và đợi hiển thị xong mới chuyển trang
      setIsSnackOpen(true);
      setSnackMessage(
        "Đặt hàng thành công! Cảm ơn bạn đã sử dụng dịch vụ của VASK Book Store.",
      );
      setSnackSeverity("success");
      
      // Lưu URL để chuyển hướng sau khi hiển thị thông báo
      const orderDetailsUrl = `/orders/${orderId}`;
      setRedirectUrl(orderDetailsUrl);
      
      // Đợi modal hiển thị đủ thời gian trước khi chuyển trang
      // Sử dụng thời gian 3000ms (3 giây) - thời gian mặc định của autoHideDuration
      setTimeout(() => {
        // Chỉ chuyển hướng nếu redirectUrl vẫn còn (người dùng không tắt notification)
        if (redirectUrl === orderDetailsUrl) {
          // Chuyển hướng đến trang chi tiết đơn hàng sau khi hiển thị thông báo
          router.push(orderDetailsUrl);
          // Reset redirectUrl sau khi đã điều hướng
          setRedirectUrl(null);
        }
      }, 3000);
    } catch (error) {
      setIsSnackOpen(true);
      setSnackMessage("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.");
      setSnackSeverity("error");
      // Reset success flag on error
      setIsOrderSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  // Reset isOrderSuccessful flag if it was previously set
  // This prevents the flag from persisting across navigations
  useEffect(() => {
    if (cartItems.length > 0 && isOrderSuccessful) {
      setIsOrderSuccessful(false);
    }
  }, [cartItems.length, isOrderSuccessful]);

  // Clear redirect state when component unmounts
  useEffect(() => {
    return () => {
      setRedirectUrl(null);
    };
  }, []);

  // Chuyển hướng người dùng nếu không có sản phẩm được chọn để đặt hàng và không phải đang trong quá trình đặt hàng thành công
  if (cartItems.length === 0 && !isOrderSuccessful) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CheckoutBreadcrumbs />
        <NotificationModal
          open={true}
          message="Không có sản phẩm nào được chọn để đặt hàng. Vui lòng quay lại giỏ hàng và chọn sản phẩm."
          onClose={() => router.push("/cart")}
          severity="warning"
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

      <NotificationModal
        open={isSnackOpen}
        message={snackMessage}
        onClose={handleCloseSnack}
        severity={snackSeverity}
      />
    </Container>
  );
}
