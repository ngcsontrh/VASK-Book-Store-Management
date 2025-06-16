"use client";

import { Home } from "@mui/icons-material";
import { Box, Breadcrumbs } from "@mui/material";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

export default function CartBreadcrumbs() {
  return (
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
        <Box display="flex" alignItems="center">
          <NextLink href="/" passHref>
            <MuiLink
              underline="hover"
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Home fontSize="small" />
            </MuiLink>
          </NextLink>
        </Box>
        <Box display="flex" alignItems="center">
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
  );
}
