"use client";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { CartItem } from "~/stores/cartStore";

interface CheckoutItemsTableProps {
  cartItems: CartItem[];
}

export default function CheckoutItemsTable({
  cartItems,
}: CheckoutItemsTableProps) {
  return (
    <Box sx={{ mt: 2, mb: 3, width: "100%" }}>
      <TableContainer component={Paper} sx={{ width: "100%", boxShadow: 1 }}>
        <Table sx={{ width: "100%" }}>
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
            {cartItems.map((item: CartItem) => (
              <TableRow key={item.book.id} hover>
                <TableCell align="left">
                  <img
                    src={item.book.imageUrl}
                    alt={item.book.title}
                    width={60}
                  />
                </TableCell>
                <TableCell align="left">{item.book.title}</TableCell>
                <TableCell align="right">
                  {item.book.price.toLocaleString()} đ
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">
                  <strong>
                    {(item.book.price * item.quantity).toLocaleString()} đ
                  </strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
