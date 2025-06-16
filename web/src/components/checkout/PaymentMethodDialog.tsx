"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectPayment: (method: string) => void;
  selectedMethod: string;
}

export default function PaymentMethodDialog({
  open,
  onClose,
  onSelectPayment,
  selectedMethod,
}: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState(selectedMethod);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleSave = () => {
    onSelectPayment(paymentMethod);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ elevation: 3, sx: { borderRadius: 2 } }}
    >
      <DialogTitle>Chọn phương thức thanh toán</DialogTitle>

      <DialogContent dividers>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            name="paymentMethod"
            value={paymentMethod}
            onChange={handleChange}
          >
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label={
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1">
                    Thanh toán khi nhận hàng (COD)
                  </Typography>
                </Stack>
              }
              sx={{
                mb: 1,
                p: 1.5,
                border: "1px solid",
                borderColor:
                  paymentMethod === "cod" ? "primary.main" : "divider",
                borderRadius: 1,
                bgcolor: paymentMethod === "cod" ? "primary.50" : "transparent",
              }}
            />

            <FormControlLabel
              value="bank-transfer"
              control={<Radio />}
              label={
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1">
                    Chuyển khoản ngân hàng
                  </Typography>
                </Stack>
              }
              sx={{
                mb: 1,
                p: 1.5,
                border: "1px solid",
                borderColor:
                  paymentMethod === "bank-transfer"
                    ? "primary.main"
                    : "divider",
                borderRadius: 1,
                bgcolor:
                  paymentMethod === "bank-transfer"
                    ? "primary.50"
                    : "transparent",
              }}
            />

            <FormControlLabel
              value="momo"
              control={<Radio />}
              label={
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1">Ví MoMo</Typography>
                </Stack>
              }
              sx={{
                mb: 1,
                p: 1.5,
                border: "1px solid",
                borderColor:
                  paymentMethod === "momo" ? "primary.main" : "divider",
                borderRadius: 1,
                bgcolor:
                  paymentMethod === "momo" ? "primary.50" : "transparent",
              }}
            />

            <FormControlLabel
              value="zalopay"
              control={<Radio />}
              label={
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1">Ví ZaloPay</Typography>
                </Stack>
              }
              sx={{
                p: 1.5,
                border: "1px solid",
                borderColor:
                  paymentMethod === "zalopay" ? "primary.main" : "divider",
                borderRadius: 1,
                bgcolor:
                  paymentMethod === "zalopay" ? "primary.50" : "transparent",
              }}
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ borderRadius: 2, bgcolor: "#26599F" }}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
