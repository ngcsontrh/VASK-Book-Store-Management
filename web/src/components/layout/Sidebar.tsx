"use client";

import BarChartIcon from "@mui/icons-material/BarChart";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  useEffect(() => {
    const handleToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    window.addEventListener("toggleSidebar", handleToggle);

    return () => {
      window.removeEventListener("toggleSidebar", handleToggle);
    };
  }, [mobileOpen]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  const mainMenu = [
    { label: "Trang chủ", path: "/", icon: <HomeIcon /> },
    { label: "Kho sách", path: "/storage", icon: <MenuBookIcon /> },
    { label: "Giỏ hàng", path: "/cart", icon: <ShoppingCartIcon /> },
    { label: "Khách hàng", path: "/customers", icon: <PeopleIcon /> },
    { label: "Báo cáo", path: "/reports", icon: <BarChartIcon /> },
    { label: "Hóa đơn", path: "/invoices", icon: <ReceiptIcon /> },
    { label: "Hỗ trợ", path: "/support", icon: <HelpIcon /> },
  ];

  const bottomMenu = [
    { label: "Cài đặt", path: "/settings", icon: <SettingsIcon /> },
    { label: "Đăng xuất", path: "/logout", icon: <LogoutIcon /> },
  ];

  const drawerContent = (
    <>
      <Box>
        {/* Logo/Header */}
        <Box
          sx={{
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <NextImage
              src="/static/images/logo.png"
              alt="Logo"
              width={140}
              height={60}
            />
          </Box>

          {isMobile && (
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Divider />

        {/* Main Menu */}
        <List sx={{ padding: 2 }}>
          {mainMenu.map(({ label, path, icon }) => {
            const isSelected = pathname === path;
            return (
              <ListItem key={label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={path}
                  selected={isSelected}
                  onClick={() => isMobile && setMobileOpen(false)}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid black",
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
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
          {bottomMenu.map(({ label, path, icon }) => (
            <ListItem key={label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={path}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile drawer (temporary) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer (permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
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
        {drawerContent}
      </Drawer>
    </>
  );
}
