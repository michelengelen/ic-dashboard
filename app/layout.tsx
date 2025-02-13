import * as React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import Drawer from "@/components/root.drawer";
import RootMUiLicense from "@/components/root.MUiLicense.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootMUiLicense />
        <SessionProvider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              {children}
            </Box>
          </Box>
        </SessionProvider>
      </body>
    </html>
  );
}
