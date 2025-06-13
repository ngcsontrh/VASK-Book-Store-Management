"use client";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const theme = useTheme();
  const pathname = usePathname();

  const mainMenu = [
    { label: "Trang chủ", path: "/" },
    { label: "Kho sách", path: "/books" },
    { label: "Giỏ hàng", path: "/cart" },
    { label: "Khách hàng", path: "/customers" },
    { label: "Báo cáo", path: "/reports" },
    { label: "Hóa đơn", path: "/invoices" },
    { label: "Hỗ trợ", path: "/support" },
  ];

  const bottomMenu = [
    { label: "Cài đặt", path: "/settings" },
    { label: "Đăng xuất", path: "/logout" },
  ];

  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box>
        {/* Logo/Header */}
        <Box
          sx={{
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            border={`2px solid ${theme.palette.primary.main}`}
            borderRadius={3}
            px={10}
            py={1}
            color={theme.palette.primary.main}
          >
            VASK
          </Typography>
        </Box>
        <Divider />

        {/* Main Menu */}
        <List sx={{ padding: 2 }}>
          {mainMenu.map(({ label, path }) => {
            const isSelected = pathname === path;
            return (
              <ListItem key={label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={path}
                  selected={isSelected}
                  sx={{
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.primary.main}`,
                    backgroundColor: isSelected
                      ? theme.palette.action.selected
                      : "transparent",
                  }}
                >
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{ fontWeight: "medium" }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Menu */}
      <Box>
        <Divider />
        <List sx={{ padding: 2 }}>
          {bottomMenu.map(({ label, path }) => (
            <ListItem key={label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={path}
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
