"use client";

import { Box, Card, Divider, Typography } from "@mui/material";
import type { CartItem } from "~/stores/cartStore";

interface OrderSummaryProps {
  cartItems: CartItem[];
}

export default function OrderSummary({ cartItems }: OrderSummaryProps) {
  // Tính tổng số tiền của đơn hàng
  const subtotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0,
  );

  // Giả sử phí vận chuyển
  const shippingFee = 30000; // 30.000đ

  // Tổng thanh toán
  const total = subtotal + shippingFee;

  return (
    <Card
      sx={{
        padding: 3,
        width: { xs: "100%", md: "35%" },
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Thông tin đơn hàng
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Danh sách sản phẩm */}
      <Box sx={{ mb: 2 }}>
        {cartItems.map((item) => (
          <Box
            key={item.book.id}
            sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
          >
            <Typography variant="body2">
              {item.book.title} (x{item.quantity})
            </Typography>
            <Typography variant="body2">
              {(item.book.price * item.quantity).toLocaleString()} đ
            </Typography>
          </Box>
        ))}
      </Box>

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

      <Divider sx={{ my: 2 }} />

      {/* Tổng thanh toán */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Tổng thanh toán:</Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {total.toLocaleString()} đ
        </Typography>
      </Box>
    </Card>
  );
}
