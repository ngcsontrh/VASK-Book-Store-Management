"use client";

import { Container } from "@mui/material";
import { useState } from "react";
import { type CartItem, useCartStore } from "~/stores/cartStore";
import CartBreadcrumbs from "./CartBreadcrumbs";
import CartItemTable from "./CartItemTable";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import NotificationSnackbar from "./NotificationSnackbar";

export default function CartContainer() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setSelectedForCheckout = useCartStore(
    (state) => state.setSelectedForCheckout,
  );

  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [snackServerity, setSnackSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(cartItems.map((item) => item.book.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleOpenDialog = (item: CartItem) => {
    setItemToDelete(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.book.id);
      setIsSnackOpen(true);
      setSnackMessage(
        `Đã xóa sách "${itemToDelete.book.title}" khỏi giỏ hàng thành công.`,
      );
      setSnackSeverity("success");
    }
    handleCloseDialog();
  };

  const handleBatchDelete = () => {
    for (const id of selectedIds) {
      removeFromCart(id);
    }
    setSelectedIds([]);
    setIsSnackOpen(true);
    setSnackMessage("Đã xóa các sản phẩm được chọn khỏi giỏ hàng.");
    setSnackSeverity("success");
  };

  const handleCloseSnack = () => {
    setIsSnackOpen(false);
    setSnackMessage("");
  };
  const handleOrder = () => {
    if (selectedIds.length === 0) {
      setIsSnackOpen(true);
      setSnackMessage("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
      setSnackSeverity("warning");
      return;
    }

    // Lưu danh sách sản phẩm được chọn vào store
    setSelectedForCheckout(selectedIds);

    // Chuyển hướng đến trang đặt hàng
    window.location.href = "/checkout";
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <CartBreadcrumbs />

      <CartItemTable
        cartItems={cartItems}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        onOpenDeleteDialog={handleOpenDialog}
        onBatchDelete={handleBatchDelete}
        onOrder={handleOrder}
      />

      <DeleteConfirmDialog
        open={openDialog}
        itemToDelete={itemToDelete}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />

      <NotificationSnackbar
        open={isSnackOpen}
        message={snackMessage}
        onClose={handleCloseSnack}
        serverity={snackServerity}
      />
    </Container>
  );
}
