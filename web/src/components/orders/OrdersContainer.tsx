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
  TableFooter,
  TableHead,
  TablePagination,
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
import { useOrderStore } from "~/stores/orderStore";

export default function OrdersContainer() {
  const { orders, setOrders } = useOrderStore();
  const [loading, setLoading] = useState(true);
  
  // Pagination states
  const [page, setPage] = useState(0); // 0-indexed for Material UI pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of orders per page
  
  // Load orders from store or fetch from backend
  useEffect(() => {
    // Simulate loading from API or check if orders are already loaded
    setTimeout(() => {
      // If you need to fetch orders from an API, you would do it here
      // For now, we'll just use what's in the store
      setLoading(false);
    }, 500); // Short delay to show loading state
  }, []);
  
  // Handle page change
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

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
            size="large"
            sx={{
              mt: 2,
              borderRadius: 2,
              bgcolor: "#26599F",
              "&:hover": {
                bgcolor: "#1E4C8A",
              },
              px: 3,
              py: 1,
              fontSize: "1rem",
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
              href="/cart"
              underline="hover"
              color="inherit"
            >
              Giỏ hàng
            </MuiLink>
          </Box>
          <Box display="flex " alignItems="center">
            <MuiLink
              component={NextLink}
              href="/checkout"
              underline="hover"
              color="inherit"
            >
              Đặt hàng
            </MuiLink>
          </Box>
          <Box display="flex " alignItems="center">
            <Typography color="text.primary">
              Quản lý đơn hàng
            </Typography>
          </Box>
        </Breadcrumbs>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Mã đơn hàng</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Ngày đặt</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Tổng tiền</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Trạng thái</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => {
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
                      size="medium"
                      sx={{ 
                        borderRadius: 2,
                        px: 2,
                        py: 0.75,
                        fontWeight: 500
                      }}
                      onClick={() => useOrderStore.getState().setSelectedOrderId(order.id)}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Hiển thị mỗi trang"
                labelDisplayedRows={({ from, to, count }) => 
                  `${from}-${to} trong ${count}`
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}
