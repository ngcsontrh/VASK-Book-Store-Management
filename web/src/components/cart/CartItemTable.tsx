"use client";

import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { type CartItem, useCartStore } from "~/stores/cartStore";

interface CartItemTableProps {
  cartItems: CartItem[];
  selectedIds: string[];
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: string) => void;
  onOpenDeleteDialog: (item: CartItem) => void;
  onBatchDelete: () => void;
  onOrder: () => void;
}

export default function CartItemTable({
  cartItems,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onOpenDeleteDialog,
  onBatchDelete,
  onOrder,
}: CartItemTableProps) {
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const updateItemQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <TableContainer sx={{ width: "100%", bgcolor: "white" }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">{}</TableCell>
              <TableCell align="left">Sản phẩm</TableCell>
              <TableCell align="left">Tên sách</TableCell>
              <TableCell align="left">Đơn giá</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Số tiền</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item: CartItem) => (
              <TableRow key={item.book.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(item.book.id)}
                    onChange={() => onSelectOne(item.book.id)}
                  />
                </TableCell>
                <TableCell align="left">
                  <img
                    src={item.book.imageUrl}
                    alt={item.book.title}
                    width={50}
                  />
                </TableCell>
                <TableCell align="left">{item.book.title}</TableCell>
                <TableCell align="left">
                  {item.book.price.toLocaleString()} đ
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItemQuantity(item.book.id, Number(e.target.value))
                    }
                    inputProps={{ min: 1, style: { textAlign: "right" } }}
                    size="small"
                    sx={{ width: 60 }}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  {(item.book.price * item.quantity).toLocaleString()} đ
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ borderRadius: 15 }}
                    onClick={() => onOpenDeleteDialog(item)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="left" padding="checkbox">
                <Checkbox
                  checked={
                    selectedIds.length === cartItems.length &&
                    cartItems.length > 0
                  }
                  onChange={onSelectAll}
                  indeterminate={
                    selectedIds.length > 0 &&
                    selectedIds.length < cartItems.length
                  }
                />
                Chọn tất cả ({cartItems.length})
              </TableCell>
              <TableCell colSpan={2} align="left">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ borderRadius: 15 }}
                  onClick={onBatchDelete}
                  disabled={selectedIds.length === 0}
                >
                  Xóa đã chọn
                </Button>
              </TableCell>
              <TableCell align="right">
                <strong>Tổng cộng:</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{getCartTotal().toLocaleString()} đ</strong>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ borderRadius: 15, bgcolor: "#26599F" }}
                  disabled={cartItems.length === 0}
                  onClick={onOrder}
                >
                  Đặt hàng
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
