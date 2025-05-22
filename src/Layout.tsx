import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAppContext } from "./hooks/useAppContext";

const drawerWidth: number = 240;

function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const {resetAdminState} = useAppContext();

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
    resetAdminState()
    console.log("Logged out");
  };

  const drawerItems = [
    { text: "Home", to: "/" },
    { text: "Flights", to: "/flights" },
    { text: "Airports", to: "/airports" },
    { text: "Admin", to: "/admin" },
  ];

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Toolbar />
      <List>
        {drawerItems.map(({ text, to }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={to}
              sx={{
                fontWeight: 500,
                color: "text.primary",
                "&.active": {
                  fontWeight: 700,
                  color: "primary.main",
                  bgcolor: "action.selected",
                },
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
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
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            backgroundColor: "#f9f9fb",
            minHeight: "100vh",
          }}
        >
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#1976d2",
              color: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box display="flex" alignItems="center">
                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <Typography variant="h6" noWrap component="div">
                  Dashboard
                </Typography>
              </Box>

              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          <Toolbar />

          {/* Main content */}
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default Layout;
