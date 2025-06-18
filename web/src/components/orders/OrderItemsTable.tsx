"use client";

import {
  Box,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { OrderItem } from "~/models/Order.model";
import { useOrderStore } from "~/stores/orderStore";

interface OrderItemsTableProps {
  items: OrderItem[];
}

export default function OrderItemsTable({ items }: OrderItemsTableProps) {
  const { selectedOrderId, orders } = useOrderStore();
  
  // Lấy thông tin đơn hàng từ orderStore nếu có
  const order = selectedOrderId ? orders.find(o => o.id === selectedOrderId) : null;
  const orderItems = order ? order.items : items;
  
  // Tính tổng thành tiền
  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2, overflow: "hidden" }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Danh sách sản phẩm
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Sản phẩm</TableCell>
              <TableCell align="left">Tên sách</TableCell>
              <TableCell align="right">Đơn giá</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="right">Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((item) => (
              <TableRow key={item.book.id} hover>
                <TableCell align="left">
                  <img
                    src={item.book.imageUrl}
                    alt={item.book.title}
                    width={60}
                    style={{ borderRadius: "4px" }}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" fontWeight="500">
                    {item.book.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.book.author}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {item.price.toLocaleString()} đ
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">
                  <Typography fontWeight="500">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </Typography>
                </TableCell>
              </TableRow>
            ))}

            {/* Tổng cộng */}
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell align="right">
                <Typography fontWeight="500">Tổng cộng:</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold" color="primary">
                  {total.toLocaleString()} đ
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
