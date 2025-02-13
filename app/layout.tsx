import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import Drawer from "@/components/root.drawer";
import RootMUiLicense from "@/components/root.MUiLicense.tsx";
import RootAppbar from "@/components/root.appbar.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootMUiLicense />
        <SessionProvider>
          <RootAppbar />
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer>
              {children}
            </Drawer>
          </Box>
        </SessionProvider>
      </body>
    </html>
  );
}
