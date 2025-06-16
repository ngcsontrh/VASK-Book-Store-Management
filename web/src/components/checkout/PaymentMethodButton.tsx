"use client";

import PaymentIcon from "@mui/icons-material/Payment";
import { Box, Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PaymentMethodDialog from "./PaymentMethodDialog";

interface PaymentMethodButtonProps {
  selectedMethod?: string;
  onChange?: (method: string) => void;
  fullWidth?: boolean;
}

export default function PaymentMethodButton({
  selectedMethod = "cod",
  onChange,
  fullWidth = false,
}: PaymentMethodButtonProps) {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(selectedMethod);

  const handleOpenPaymentDialog = () => {
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
  };

  const handleSelectPayment = (method: string) => {
    setPaymentMethod(method);
    if (onChange) {
      onChange(method);
    }
  };
  // Update local state if selectedMethod prop changes
  useEffect(() => {
    if (selectedMethod !== paymentMethod) {
      setPaymentMethod(selectedMethod);
    }
  }, [selectedMethod, paymentMethod]);

  // Map paymentMethod to display text
  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case "cod":
        return "Thanh toán khi nhận hàng (COD)";
      case "bank-transfer":
        return "Chuyển khoản ngân hàng";
      case "momo":
        return "Ví MoMo";
      case "zalopay":
        return "Ví ZaloPay";
      default:
        return "Chưa chọn phương thức thanh toán";
    }
  };
  return (
    <>
      {" "}
      <Button
        variant="outlined"
        onClick={handleOpenPaymentDialog}
        sx={{
          p: 1.5,
          mb: 3,
          borderRadius: 2,
          width: fullWidth ? "100%" : "400px",
          flexGrow: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textTransform: "none",
          bgcolor: "white",
          color: "text.primary",
          borderColor: "#e0e0e0",
          boxShadow: 1,
          "&:hover": {
            bgcolor: "#fafafa",
            borderColor: "#bdbdbd",
          },
        }}
      >
        {" "}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PaymentIcon color="action" fontSize="small" />
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body1" fontWeight="medium">
              Phương thức thanh toán:
            </Typography>
            <Typography component="span" variant="body2" color="text.secondary">
              {getPaymentMethodText()}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 1,
            minWidth: "auto",
            ml: 1,
          }}
        >
          Thay đổi
        </Button>
      </Button>
      <PaymentMethodDialog
        open={paymentDialogOpen}
        onClose={handleClosePaymentDialog}
        onSelectPayment={handleSelectPayment}
        selectedMethod={paymentMethod}
      />
    </>
  );
}
