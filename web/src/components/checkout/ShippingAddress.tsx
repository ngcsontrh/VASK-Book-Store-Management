"use client";

import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";

interface UserInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

interface ShippingAddressProps {
  userInfo: UserInfo;
  onEditClick: () => void;
}

export default function ShippingAddress({
  userInfo,
  onEditClick,
}: ShippingAddressProps) {
  const { fullName, phone, address, city, district, ward } = userInfo;
  return (
    <Card
      sx={{ mt: 1, mb: 2, borderRadius: 2, bgcolor: "white", boxShadow: 1 }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
        }}
      >
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          sx={{ flex: 1, width: "100%" }}
        >
          <Box sx={{ width: { xs: "100%", md: "auto" } }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Địa chỉ nhận hàng
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <PersonIcon fontSize="small" color="action" sx={{ mr: 1 }} />{" "}
              {fullName} | {phone}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
              width: { xs: "100%", md: "auto" },
              mt: { xs: 1, md: 0 },
            }}
          >
            <LocationOnIcon
              fontSize="small"
              color="action"
              sx={{ mt: 0.3, flexShrink: 0 }}
            />
            <Typography>
              {address}, {ward}, {district}, {city}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="small"
            onClick={onEditClick}
            startIcon={<EditIcon />}
            sx={{
              borderRadius: 2,
              minWidth: 100,
              alignSelf: { xs: "flex-end", md: "center" },
            }}
          >
            Thay đổi
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
