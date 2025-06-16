"use client";

import { Home } from "@mui/icons-material";
import { Box, Breadcrumbs } from "@mui/material";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

interface OrderBreadcrumbsProps {
  orderId: string;
}

export default function OrderBreadcrumbs({ orderId }: OrderBreadcrumbsProps) {
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
            href="/orders"
            underline="hover"
            color="inherit"
          >
            Đơn hàng
          </MuiLink>
        </Box>
        <Box display="flex" alignItems="center">
          <MuiLink
            component={NextLink}
            href={`/orders/${orderId}`}
            underline="hover"
            color="inherit"
          >
            Đơn hàng
          </MuiLink>
        </Box>
      </Breadcrumbs>
    </Box>
  );
}
