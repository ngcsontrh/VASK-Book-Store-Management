"use client";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { 
  Box, 
  Card, 
  Chip, 
  Divider, 
  Stack, 
  Typography,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { Order } from "~/models/Order.model";
import { useOrderStore } from "~/stores/orderStore";
import { useState } from "react";

interface OrderInfoProps {
  order: Order;
}

export default function OrderInfo({ order }: OrderInfoProps) {
  const { updateOrder } = useOrderStore();
  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);
  const statusMenuOpen = Boolean(statusAnchorEl);

  const {
    id,
    orderDate,
    userInfo,
    paymentMethod,
    status,
    subtotal,
    shippingFee,
    total,
  } = order;

  const { fullName, phone, address, city, district, ward } = userInfo;
  
  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setStatusAnchorEl(null);
  };

  const handleStatusChange = (newStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled") => {
    updateOrder(id, { status: newStatus });
    handleStatusClose();
  };

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
        return "Không xác định";
    }
  };
  // Map status to display color and text
  const getStatusInfo = () => {
    switch (status) {
      case "pending":
        return { color: "warning" as const, text: "Chờ xác nhận" };
      case "processing":
        return { color: "info" as const, text: "Đang xử lý" };
      case "shipped":
        return { color: "primary" as const, text: "Đang giao hàng" };
      case "delivered":
        return { color: "success" as const, text: "Đã giao hàng" };
      case "cancelled":
        return { color: "error" as const, text: "Đã hủy" };
      default:
        return { color: "default" as const, text: "Không xác định" };
    }
  };

  const statusInfo = getStatusInfo();
  const formattedDate = format(new Date(orderDate), "HH:mm - dd/MM/yyyy", {
    locale: vi,
  });

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2, overflow: "hidden" }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            display="flex"
            alignItems="center"
          >
            <LocalAtmIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            <Typography component="span" variant="h6" fontWeight="bold">
              Chi tiết đơn hàng
            </Typography>
          </Typography>
          <Box>
            <Chip
              label={statusInfo.text}
              color={statusInfo.color}
              onClick={handleStatusClick}
              sx={{ borderRadius: 1, fontWeight: 500, cursor: 'pointer' }}
            />
            <Menu
              anchorEl={statusAnchorEl}
              open={statusMenuOpen}
              onClose={handleStatusClose}
            >
              <MenuItem onClick={() => handleStatusChange("pending")}>Chờ xác nhận</MenuItem>
              <MenuItem onClick={() => handleStatusChange("processing")}>Đang xử lý</MenuItem>
              <MenuItem onClick={() => handleStatusChange("shipped")}>Đang giao hàng</MenuItem>
              <MenuItem onClick={() => handleStatusChange("delivered")}>Đã giao hàng</MenuItem>
              <MenuItem onClick={() => handleStatusChange("cancelled")}>Đã hủy</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Thông tin thời gian đặt hàng */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <AccessTimeIcon color="action" />
            <Box>
              <Typography variant="subtitle1" fontWeight="500">
                Thời gian đặt hàng
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Thông tin người nhận */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <PersonIcon color="action" />
            <Box>
              <Typography variant="subtitle1" fontWeight="500">
                Thông tin người nhận
              </Typography>
              <Typography variant="body2">
                {fullName} | {phone}
              </Typography>
            </Box>
          </Box>

          {/* Địa chỉ giao hàng */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <LocationOnIcon color="action" />
            <Box>
              <Typography variant="subtitle1" fontWeight="500">
                Địa chỉ giao hàng
              </Typography>
              <Typography variant="body2">
                {address}, {ward}, {district}, {city}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Phương thức vận chuyển */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <LocalShippingIcon color="action" />
            <Box>
              <Typography variant="subtitle1" fontWeight="500">
                Phương thức vận chuyển
              </Typography>
              <Typography variant="body2">Giao hàng tiêu chuẩn</Typography>
            </Box>
          </Box>

          {/* Phương thức thanh toán */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <PaymentIcon color="action" />
            <Box>
              <Typography variant="subtitle1" fontWeight="500">
                Phương thức thanh toán
              </Typography>
              <Typography variant="body2">{getPaymentMethodText()}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* Thông tin thanh toán */}
          <Box>
            <Typography variant="subtitle1" fontWeight="500" gutterBottom>
              Tổng thanh toán
            </Typography>

            <Stack spacing={1}>
              {/* Tạm tính */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Tạm tính:
                </Typography>
                <Typography variant="body2">
                  {subtotal.toLocaleString()} đ
                </Typography>
              </Box>

              {/* Phí vận chuyển */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Phí vận chuyển:
                </Typography>
                <Typography variant="body2">
                  {shippingFee.toLocaleString()} đ
                </Typography>
              </Box>

              <Divider />

              {/* Tổng thanh toán */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" fontWeight="500">
                  Tổng cộng:
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  {total.toLocaleString()} đ
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
}
