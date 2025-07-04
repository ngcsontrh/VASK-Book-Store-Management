"use client";

import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ width: "100%", mt: "auto" }}>
      <Divider />
      <Container maxWidth={false} disableGutters>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={3}
          sx={{
            py: 3,
            px: 4,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Box sx={{ minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Địa chỉ
            </Typography>
            <Typography variant="body2">
              29 Chùa Bộc, Đống Đa, Hà Nội
            </Typography>
          </Box>

          <Box sx={{ minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Dịch vụ
            </Typography>
            <List disablePadding dense>
              <ListItem disableGutters>
                <ListItemText primary="Mua sách" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Thuê sách" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Chăm sóc khách hàng" />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Chính sách điều khoản
            </Typography>
            <List disablePadding dense>
              <ListItem disableGutters>
                <ListItemText primary="Điều khoản dịch vụ" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Chính sách bảo mật" />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ minWidth: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Liên kết
            </Typography>
            <List disablePadding dense>
              <ListItem disableGutters>
                <ListItemText primary="Facebook" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="Instagram" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText primary="SĐT: 0123456789" />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
