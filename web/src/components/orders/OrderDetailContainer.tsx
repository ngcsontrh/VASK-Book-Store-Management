"use client";

import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import type { Order } from "~/models/Order.model";
import OrderBreadcrumbs from "./OrderBreadcrumbs";
import OrderInfo from "./OrderInfo";
import OrderItemsTable from "./OrderItemsTable";

const mockOrder: Order = {
  id: "ORD123456789",
  orderDate: "2025-06-15T08:30:00.000Z",
  items: [
    {
      book: {
        id: "book1",
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        price: 85000,
        imageUrl: "/static/images/books/book1.jpg",
        description:
          "Đắc nhân tâm (How to Win Friends and Influence People) là một quyển sách nhằm tự giúp bản thân bán chạy nhất từ trước đến nay.",
        category: "self-help",
        stock: 10,
        publisher: "NXB Tổng hợp TP.HCM",
        publishedDate: "2020-01-01",
        isbn: "9786045427712",
      },
      quantity: 2,
      price: 85000,
    },
    {
      book: {
        id: "book2",
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        price: 65000,
        imageUrl: "/static/images/books/book2.jpg",
        description:
          "Nhà giả kim là tiểu thuyết được xuất bản lần đầu ở Brasil năm 1988, và là cuốn sách nổi tiếng nhất của nhà văn Paulo Coelho.",
        category: "fiction",
        stock: 15,
        publisher: "NXB Hội Nhà Văn",
        publishedDate: "2020-02-01",
        isbn: "9786049758858",
      },
      quantity: 1,
      price: 65000,
    },
    {
      book: {
        id: "book3",
        title: "Không Gia Đình",
        author: "Hector Malot",
        price: 78000,
        imageUrl: "/static/images/books/book3.jpg",
        description:
          "Không gia đình kể về cuộc đời của cậu bé Rémi, một đứa trẻ mồ côi phải xa gia đình từ nhỏ.",
        category: "fiction",
        stock: 8,
        publisher: "NXB Kim Đồng",
        publishedDate: "2019-12-15",
        isbn: "9786041092969",
      },
      quantity: 1,
      price: 78000,
    },
  ],
  userInfo: {
    fullName: "Nguyễn Văn A",
    phone: "0987654321",
    address: "123 Đường ABC",
    city: "TP. Hồ Chí Minh",
    district: "Quận 1",
    ward: "Phường Bến Nghé",
  },
  paymentMethod: "cod",
  status: "delivered",
  subtotal: 313000, // 85000*2 + 65000 + 78000
  shippingFee: 30000,
  total: 343000, // 313000 + 30000
};

interface OrderDetailContainerProps {
  orderId: string;
}

export default function OrderDetailContainer({
  orderId,
}: OrderDetailContainerProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mô phỏng việc lấy thông tin đơn hàng từ API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Trong thực tế, đây sẽ là một API call để lấy thông tin đơn hàng
        // const response = await fetch(`/api/orders/${orderId}`);
        // const data = await response.json();

        // Sử dụng dữ liệu mẫu
        setOrder(mockOrder);
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.");
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

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
