"use client";

import { Home } from "@mui/icons-material";
import { Box, Breadcrumbs, Container } from "@mui/material";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

export default function CartPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          borderBottom: "1px solid",
          borderBottomColor: "divider",
          paddingY: 1,
        }}
      >
        <Breadcrumbs sx={{ display: "flex", alignItems: "center" }}>
          <Box display="flex " alignItems="center">
            <Home fontSize="small" />
          </Box>
          <Box display="flex " alignItems="center">
            <MuiLink
              component={NextLink}
              href="/cart"
              underline="hover"
              color="inherit"
            >
              Giỏ hàng
            </MuiLink>
          </Box>
        </Breadcrumbs>
      </Box>
    </Container>
  );
}
