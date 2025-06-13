"use client";

import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

export default function Header() {
  const theme = useTheme();
  const drawerWidth = 240;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        height: 70,
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
          sx={{ px: 3 }}
        >
          <TextField
            label="Bạn tìm gì"
            variant="outlined"
            size="small"
            sx={{
              width: 450,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                border: `1px solid ${theme.palette.divider}`,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            px: 3,
            minWidth: 250,
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton>
              <NotificationsIcon fontSize="large" />
            </IconButton>

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
                  width: 40,
                  height: 40,
                }}
              >
                N
              </Avatar>
              <Typography variant="subtitle1" fontWeight="medium">
                Ngọc Sơn
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
