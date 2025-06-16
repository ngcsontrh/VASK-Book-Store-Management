"use client";

import { Alert, Snackbar } from "@mui/material";

interface NotificationSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  serverity?: "success" | "error" | "warning" | "info";
}

export default function NotificationSnackbar({
  open,
  message,
  onClose,
  serverity = "success",
}: NotificationSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        maxWidth: "480px", // giới hạn chiều rộng
        "& .MuiSnackbarContent-root": {
          padding: 0,
        },
      }}
    >
      <Alert
        severity={serverity}
        sx={{
          width: "100%",
          fontSize: "0.9rem", // vừa phải
          fontWeight: 500, // đậm
          padding: "14px 20px",
          borderRadius: 2,
          boxShadow: 3, // tạo chiều sâu
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
