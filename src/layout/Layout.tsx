import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Outlet, useNavigate } from "react-router";
import { useAppContext } from "../hooks/useAppContext";
import Drawer from "@/components/Layout/Drawer";
import LayoutHeader from "@/components/Layout/LayoutHeader";

const drawerWidth: number = 240;

function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const { resetAdminState } = useAppContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/login");
    resetAdminState();
    console.log("Logged out");
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <MuiDrawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: theme.palette.background.paper,
              },
            }}
          >
            <Drawer />
          </MuiDrawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            backgroundColor: "#f9f9fb",
            minHeight: "100vh",
            width: "calc(100% - 250px)",
          }}
        >
          <LayoutHeader 
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleDrawerToggle={handleDrawerToggle}
            handleLogout={handleLogout}
            handleMenu={handleMenu}
            isMobile={isMobile}
          />

          <Toolbar />

          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default Layout;
