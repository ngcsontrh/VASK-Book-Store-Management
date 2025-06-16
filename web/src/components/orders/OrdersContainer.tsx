"use client";

import { Home } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "~/models/Order.model";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

// Mock data cho danh sách đơn hàng
const mockOrders: Order[] = [
  {
    id: "ORD123456789",
    orderDate: "2025-06-15T08:30:00.000Z",
    items: [], // Trong danh sách không cần chi tiết các sản phẩm
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
    subtotal: 313000,
    shippingFee: 30000,
    total: 343000,
  },
  {
    id: "ORD987654321",
    orderDate: "2025-06-10T14:45:00.000Z",
    items: [],
    userInfo: {
      fullName: "Nguyễn Văn A",
      phone: "0987654321",
      address: "123 Đường ABC",
      city: "TP. Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
    },
    paymentMethod: "bank-transfer",
    status: "shipped",
    subtotal: 150000,
    shippingFee: 30000,
    total: 180000,
  },
  {
    id: "ORD567891234",
    orderDate: "2025-06-05T10:15:00.000Z",
    items: [],
    userInfo: {
      fullName: "Nguyễn Văn A",
      phone: "0987654321",
      address: "123 Đường ABC",
      city: "TP. Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
    },
    paymentMethod: "momo",
    status: "processing",
    subtotal: 225000,
    shippingFee: 30000,
    total: 255000,
  },
];

export default function OrdersContainer() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Mô phỏng việc lấy danh sách đơn hàng từ API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Trong thực tế, đây sẽ là một API call
        // const response = await fetch('/api/orders');
        // const data = await response.json();

        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Map status to display color and text
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { color: "#FFA726", text: "Chờ xác nhận" };
      case "processing":
        return { color: "#42A5F5", text: "Đang xử lý" };
      case "shipped":
        return { color: "#26599F", text: "Đang giao hàng" };
      case "delivered":
        return { color: "#66BB6A", text: "Đã giao hàng" };
      case "cancelled":
        return { color: "#EF5350", text: "Đã hủy" };
      default:
        return { color: "#9E9E9E", text: "Không xác định" };
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: "60vh" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Đơn hàng của tôi
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <Typography>Đang tải danh sách đơn hàng...</Typography>
        </Box>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: "60vh" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Đơn hàng của tôi
        </Typography>
        <Paper
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <AddShoppingCartIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            Bạn chưa có đơn hàng nào
          </Typography>
          <Typography color="text.secondary" paragraph>
            Hãy khám phá hàng ngàn đầu sách và chọn cho mình cuốn sách yêu thích
          </Typography>
          <Button
            component={Link}
            href="/books"
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: 2,
              bgcolor: "#26599F",
              "&:hover": {
                bgcolor: "#1E4C8A",
              },
            }}
          >
            Mua sắm ngay
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: "60vh" }}>
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          borderBottom: "1px solid",
          borderBottomColor: "divider",
          paddingY: 1,
          marginBottom: 3,
        }}
      >
        <Breadcrumbs sx={{ display: "flex", alignItems: "center" }}>
          <Box display="flex " alignItems="center">
            <Home fontSize="small" />
          </Box>
          <Box display="flex " alignItems="center">
            <MuiLink
              component={NextLink}
              href="/orders"
              underline="hover"
              color="inherit"
            >
              Giỏ hàng
            </MuiLink>
          </Box>
          <Box display="flex " alignItems="center">
            <MuiLink
              component={NextLink}
              href="/orders"
              underline="hover"
              color="inherit"
            >
              Đặt hàng
            </MuiLink>
          </Box>
          <Box display="flex " alignItems="center">
            <MuiLink
              component={NextLink}
              href="/orders"
              underline="hover"
              color="inherit"
            >
              Quản lý đơn hàng
            </MuiLink>
          </Box>
        </Breadcrumbs>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell align="center">Tổng tiền</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const orderDate = new Date(order.orderDate);
              const formattedDate = format(orderDate, "HH:mm - dd/MM/yyyy", {
                locale: vi,
              });

              return (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      #{order.id.slice(-6).toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell align="center">
                    {order.total.toLocaleString()} đ
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "4px",
                        backgroundColor: `${statusInfo.color}15`, // 15% opacity
                        color: statusInfo.color,
                        fontWeight: 500,
                      }}
                    >
                      {statusInfo.text}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component={Link}
                      href={`/orders/${order.id}`}
                      variant="contained"
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
