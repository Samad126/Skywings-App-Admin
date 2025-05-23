import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HeaderProfile from "./HeaderProfile";

type Props = {
  isMobile: boolean;
  handleDrawerToggle: () => void;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleLogout: () => void;
  anchorEl: null | HTMLElement;
};

function LayoutHeader({
  anchorEl,
  handleDrawerToggle,
  handleMenu,
  isMobile,
  handleClose,
  handleLogout,
}: Props) {
  return (
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

        <HeaderProfile
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleLogout={handleLogout}
          handleMenu={handleMenu}
        />
      </Toolbar>
    </AppBar>
  );
}

export default LayoutHeader;
