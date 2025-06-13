"use client";

import { ThemeProvider } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import createEmotionCache from "~/createEmotionCache";
import theme from "~/theme";

const cache = createEmotionCache();

export default function ThemeRegistry({
  children,
}: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
