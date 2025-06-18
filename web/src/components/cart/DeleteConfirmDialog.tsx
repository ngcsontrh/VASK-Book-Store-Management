"use client";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
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
          sx={{ verticalAlign: "middle", mr: 1.5, fontSize: 36 }}
        />
        <Typography variant="h5" component="span" fontWeight={600} sx={{ fontSize: '1.5rem' }}>
          Xác nhận xóa sản phẩm
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="body1" gutterBottom color="text.primary" sx={{ fontSize: '1.1rem', mt: 1 }}>
          Bạn có chắc chắn muốn xóa sản phẩm{" "}
          <strong>{itemToDelete?.book.title}</strong> khỏi giỏ hàng không?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          size="large"
          sx={{
            borderRadius: 15,
            color: "white",
            backgroundColor: "grey.600",
            "&:hover": { backgroundColor: "grey.800" },
            fontSize: '1rem',
            px: 3,
            py: 1
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          autoFocus
          variant="contained"
          size="large"
          sx={{ 
            borderRadius: 15,
            fontSize: '1rem',
            px: 3,
            py: 1
          }}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
