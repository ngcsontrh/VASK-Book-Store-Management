"use client";

import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Popover,
} from "@mui/material";
import NextLink from "next/link";
import { useCart } from "~/context/CartContext";
import { useState } from "react";

interface HeaderProps {
  drawerWidth?: number;
}

export default function Header({ drawerWidth = 240 }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const { getCartItemsCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    // Dispatch custom event that Sidebar will listen for
    window.dispatchEvent(new CustomEvent("toggleSidebar"));
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      setAnchorEl(event.currentTarget);
      setSearchOpen(true);
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` },
        height: { xs: 60, sm: 70 },
        bgcolor: "white",
        color: theme.palette.text.primary,
        boxShadow: 1,
        zIndex: theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          p: 0,
        }}
      >
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Search box - visible on medium and larger screens */}
        {!isMobile && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
            sx={{ px: { xs: 1, sm: 3 } }}
          >
            <TextField
              label="Bạn tìm gì"
              variant="outlined"
              size="small"
              sx={{
                width: { xs: "100%", md: 350, lg: 450 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  border: `1px solid ${theme.palette.divider}`,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}

        {/* Search icon for mobile */}
        {isMobile && (
          <IconButton onClick={handleSearchClick} sx={{ mr: 1 }}>
            <SearchIcon />
          </IconButton>
        )}

        {/* Mobile search popover */}
        <Popover
          open={searchOpen}
          anchorEl={anchorEl}
          onClose={handleSearchClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{ mt: 1 }}
        >
          <Box sx={{ p: 2, width: 280 }}>
            <TextField
              label="Bạn tìm gì"
              variant="outlined"
              size="small"
              fullWidth
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Popover>

        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            px: { xs: 1, sm: 2, md: 3 },
            minWidth: { xs: "auto", sm: 150, md: 250 },
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <IconButton component={NextLink} href="/cart">
              <Badge badgeContent={getCartItemsCount()} color="primary">
                <ShoppingCartIcon fontSize={isMobile ? "medium" : "large"} />
              </Badge>
            </IconButton>

            {!isMobile && (
              <IconButton>
                <NotificationsIcon fontSize={isMobile ? "medium" : "large"} />
              </IconButton>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: { xs: 32, sm: 40 },
                  height: { xs: 32, sm: 40 },
                }}
              >
                N
              </Avatar>
              {!isMedium && (
                <Typography variant="subtitle1" fontWeight="medium">
                  Ngọc Sơn
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
