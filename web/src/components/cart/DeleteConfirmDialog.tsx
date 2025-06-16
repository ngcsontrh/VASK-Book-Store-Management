"use client";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { CartItem } from "~/stores/cartStore";

interface DeleteConfirmDialogProps {
  open: boolean;
  itemToDelete: CartItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  open,
  itemToDelete,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <WarningAmberIcon
          color="warning"
          fontSize="large"
          sx={{ verticalAlign: "middle", mr: 1 }}
        />
        Xác nhận xóa sản phẩm
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có chắc chắn muốn xóa sản phẩm{" "}
          <strong>{itemToDelete?.book.title}</strong> khỏi giỏ hàng không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: 15,
            color: "white",
            backgroundColor: "grey.600",
            "&:hover": { backgroundColor: "grey.800" },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          autoFocus
          variant="contained"
          sx={{ borderRadius: 15 }}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
