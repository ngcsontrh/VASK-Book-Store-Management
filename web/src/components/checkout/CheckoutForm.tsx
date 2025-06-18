"use client";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Order } from "~/models/Order.model";
import type { UserShippingInfo } from "~/models/User.model";
import { useCartStore } from "~/stores/cartStore";
import { useOrderStore } from "~/stores/orderStore";

interface CheckoutFormProps {
  onOrderComplete: (success: boolean) => void;
}

// Combine UserShippingInfo with additional checkout form fields
interface CheckoutFormData extends UserShippingInfo {
  email: string;
  paymentMethod: string;
  notes: string;
}

export default function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const clearSelectedForCheckout = useCartStore(
    (state) => state.clearSelectedForCheckout,
  );
  const selectedIds = useCartStore((state) => state.selectedForCheckout);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // Form state with properly typed interface
  const [formData, setFormData] = useState<CheckoutFormData>({
    // UserShippingInfo fields
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    // Additional fields
    email: "",
    paymentMethod: "cod",
    notes: "",
  });

  // Validation errors with proper typing
  const [errors, setErrors] = useState<Record<keyof Omit<CheckoutFormData, 'city' | 'district' | 'ward' | 'notes' | 'paymentMethod'>, string>>({
    fullName: "",
    email: "",
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
    if (name in errors) {
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

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const { addOrder, setSelectedOrderId } = useOrderStore();
  const cartItems = useCartStore(state => state.cartItems.filter(item => 
    selectedIds.includes(item.book.id)
  ));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Tính tổng tiền hàng
      const subtotal = cartItems.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0
      );
      
      // Giả sử phí vận chuyển là 30.000đ
      const shippingFee = 30000;
      
      // Tạo đối tượng đơn hàng với thông tin đầy đủ theo interface Order
      const orderId = `ORD${Date.now().toString().slice(-10)}`;
      
      // Tạo đối tượng order với kiểu Order
      const order: Order = {
        id: orderId,
        orderDate: new Date().toISOString(),
        items: cartItems.map(item => ({
          book: item.book,
          quantity: item.quantity,
          price: item.book.price
        })),
        userInfo: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          ward: formData.ward,
        },
        paymentMethod: formData.paymentMethod,
        status: "pending",
        subtotal,
        shippingFee,
        total: subtotal + shippingFee,
      };
      
      // Lưu đơn hàng vào orderStore
      addOrder(order);
      setSelectedOrderId(orderId);

      // Xóa các sản phẩm đã đặt khỏi giỏ hàng
      for (const id of selectedIds) {
        removeFromCart(id);
      }

      // Xóa danh sách sản phẩm được chọn để đặt hàng
      clearSelectedForCheckout();

      // Thông báo đặt hàng thành công
      onOrderComplete(true);

      // Chuyển hướng đến trang chi tiết đơn hàng
      router.push(`/orders/${orderId}`);
    } catch (error) {
      onOrderComplete(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    clearSelectedForCheckout();
    router.push("/cart");
  };

  return (
    <Card
      sx={{
        padding: 3,
        width: { xs: "100%", md: "65%" },
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Thông tin đặt hàng
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={3}>
          {/* Thông tin người nhận */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Thông tin người nhận
            </Typography>

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                required
              />

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
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
            </Stack>
          </Box>

          {/* Địa chỉ giao hàng */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Địa chỉ giao hàng
            </Typography>

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                required
              />

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
          </Box>

          {/* Phương thức thanh toán */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Phương thức thanh toán
            </Typography>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControl component="fieldset">
                <RadioGroup
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Thanh toán khi nhận hàng (COD)"
                  />
                  <FormControlLabel
                    value="bank-transfer"
                    control={<Radio />}
                    label="Chuyển khoản ngân hàng"
                  />
                  <FormControlLabel
                    value="e-wallet"
                    control={<Radio />}
                    label="Ví điện tử (MoMo, ZaloPay,...)"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Box>

          {/* Ghi chú */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Ghi chú
            </Typography>

            <TextField
              fullWidth
              label="Ghi chú đơn hàng (tuỳ chọn)"
              name="notes"
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
          </Box>

          {/* Nút bấm */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
              sx={{ borderRadius: 15, minWidth: 120 }}
            >
              Quay lại
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ borderRadius: 15, minWidth: 120, bgcolor: "#26599F" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Đặt hàng"
              )}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}
