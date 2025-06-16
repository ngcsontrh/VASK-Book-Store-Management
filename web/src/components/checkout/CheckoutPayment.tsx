"use client";

import { Box, Button, Card, Divider, Typography } from "@mui/material";
import type { CartItem } from "~/stores/cartStore";

interface CheckoutPaymentProps {
  cartItems: CartItem[];
  onPlaceOrder: () => void;
  loading?: boolean;
  paymentMethod?: string;
  fullWidth?: boolean;
}

export default function CheckoutPayment({
  cartItems,
  onPlaceOrder,
  loading = false,
  paymentMethod = "cod",
  fullWidth = false,
}: CheckoutPaymentProps) {
  // Tính tổng số tiền của đơn hàng
  const subtotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0,
  );

  // Giả sử phí vận chuyển
  const shippingFee = 30000; // 30.000đ
  // Tổng thanh toán
  const total = subtotal + shippingFee;

  // Map paymentMethod to display text
  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case "cod":
        return "Thanh toán khi nhận hàng (COD)";
      case "bank-transfer":
        return "Chuyển khoản ngân hàng";
      case "momo":
        return "Ví MoMo";
      case "zalopay":
        return "Ví ZaloPay";
      default:
        return "Chưa chọn phương thức thanh toán";
    }
  };
  return (
    <Card
      sx={{
        padding: 3,
        width: fullWidth ? "100%" : { xs: "100%", md: "35%" },
        borderRadius: 2,
        boxShadow: 2,
        flexGrow: fullWidth ? 1 : 0,
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Thông tin thanh toán
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Tổng tiền sản phẩm */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography>Tạm tính:</Typography>
        <Typography>{subtotal.toLocaleString()} đ</Typography>
      </Box>

      {/* Phí vận chuyển */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography>Phí vận chuyển:</Typography>
        <Typography>{shippingFee.toLocaleString()} đ</Typography>
      </Box>

      {/* Hiển thị phương thức thanh toán đã chọn */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography>Phương thức thanh toán:</Typography>
        <Typography>{getPaymentMethodText()}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Tổng thanh toán */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Tổng thanh toán:</Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {total.toLocaleString()} đ
        </Typography>
      </Box>
      {/* Nút đặt hàng */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disabled={loading}
        onClick={onPlaceOrder}
        sx={{
          borderRadius: 2,
          py: 1.5,
          bgcolor: "#26599F",
          "&:hover": {
            bgcolor: "#1E4C8A",
          },
        }}
      >
        {loading ? "Đang xử lý..." : "Đặt hàng"}
      </Button>
    </Card>
  );
}
