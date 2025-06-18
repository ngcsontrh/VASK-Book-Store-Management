"use client";

import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import OrderBreadcrumbs from "./OrderBreadcrumbs";
import OrderInfo from "./OrderInfo";
import OrderItemsTable from "./OrderItemsTable";
import { useOrderStore } from "~/stores/orderStore";

interface OrderDetailContainerProps {
  orderId: string;
}

export default function OrderDetailContainer({
  orderId,
}: OrderDetailContainerProps) {
  const { orders, addOrder, setSelectedOrderId } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tìm đơn hàng từ orderStore
  const order = orders.find((o) => o.id === orderId);

  // Lấy thông tin đơn hàng từ API nếu chưa có trong orderStore
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        // Trong thực tế, đây sẽ là một API call để lấy thông tin đơn hàng
        // const response = await fetch(`/api/orders/${orderId}`);
        // const data = await response.json();
        
        // Cập nhật state với orderId hiện tại, nhưng không thêm dữ liệu mẫu
        setSelectedOrderId(orderId);
        
        // Trong thực tế, chỗ này sẽ thêm dữ liệu từ API vào store
        // addOrder(data);
        
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.");
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    // Chỉ fetch dữ liệu nếu chưa có sẵn trong orderStore
    if (orderId && !order) {
      fetchOrderDetails();
    } else {
      setLoading(false);
      setSelectedOrderId(orderId);
    }
  }, [orderId, order, setSelectedOrderId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <OrderBreadcrumbs orderId={orderId} />
        <Box sx={{ mt: 4, textAlign: "center" }}>
          Đang tải thông tin đơn hàng...
        </Box>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <OrderBreadcrumbs orderId={orderId} />
        <Box sx={{ mt: 4, textAlign: "center", color: "error.main" }}>
          {error || "Không tìm thấy thông tin đơn hàng"}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <OrderBreadcrumbs orderId={order.id} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mt: 4,
          mb: 4,
        }}
      >
        {/* Thông tin chi tiết đơn hàng - Bên trái */}
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <OrderInfo order={order} />
        </Box>

        {/* Bảng danh sách sản phẩm - Bên phải */}
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <OrderItemsTable items={order.items} />
        </Box>
      </Box>
    </Container>
  );
}
