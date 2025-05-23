import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router";

const drawerItems = [
  { text: "Home", to: "/" },
  { text: "Flights", to: "/flights" },
  { text: "Airports", to: "/airports" },
  { text: "Admin", to: "/admin" },
];

function Drawer() {
  return (
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
}

export default Drawer;
