"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { UserShippingInfo } from "~/models/User.model";

interface UserInfoDialogProps {
  open: boolean;
  userInfo: UserShippingInfo;
  onClose: () => void;
  onSave: (userInfo: UserShippingInfo) => void;
}

export default function UserInfoDialog({
  open,
  userInfo,
  onClose,
  onSave,
}: UserInfoDialogProps) {
  const [formData, setFormData] = useState<UserShippingInfo>(userInfo);
  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ elevation: 3, sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ typography: 'h5', fontWeight: 600, fontSize: '1.5rem', py: 2 }}>Thông tin người nhận</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Họ và tên người nhận"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              required
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              required
            />
          </Stack>

          <TextField
            fullWidth
            label="Địa chỉ chi tiết"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            required
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Tỉnh/Thành phố"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Quận/Huyện"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Phường/Xã"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          size="large"
          sx={{ 
            borderRadius: 2,
            fontSize: '1rem',
            px: 3,
            py: 1
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{ 
            borderRadius: 2, 
            bgcolor: "#26599F", 
            fontSize: '1rem',
            px: 3,
            py: 1
          }}
        >
          Lưu thông tin
        </Button>
      </DialogActions>
    </Dialog>
  );
}
