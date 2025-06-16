// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import ThemeRegistry from "~/ThemeRegistry";
import Footer from "~/components/layout/Footer";
import Header from "~/components/layout/Header";
import Sidebar from "~/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "VASK",
  description: "A book store management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set a consistent drawer width to be used across components
  const drawerWidth = 240;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeRegistry>
          <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar - responsive */}
            <Box
              component="nav"
              sx={{
                width: { xs: 0, sm: drawerWidth },
                flexShrink: { sm: 0 },
              }}
              aria-label="navigation menu"
            >
              <Sidebar />
            </Box>

            {/* Main Content - flexes to fill remaining space */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
              }}
            >
              <Header drawerWidth={drawerWidth} />
              <Toolbar />
              {/* Page Content - flexes to fill available space */}
              <Box
                sx={{
                  flexGrow: 1,
                  p: { xs: 2, sm: 3 },
                }}
              >
                {children}
              </Box>
              {/* Footer - stays at the bottom */}
              <Footer />
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
