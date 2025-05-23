import { useAppContext } from "@/hooks/useAppContext";
import useFetchData from "@/hooks/useFetchData";
import type { AdminDetail } from "@/types/Admin";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

type Props = {
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleLogout: () => void;
  anchorEl: null | HTMLElement;
};

function HeaderProfile({
  anchorEl,
  handleMenu,
  handleClose,
  handleLogout,
}: Props) {
  const { adminId } = useAppContext();

  const headers = useMemo(() => ({}), []);

  const { data: adminInfo, isLoading } = useFetchData<AdminDetail>(
    "admin",
    adminId,
    null,
    headers
  );

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="subtitle1">
        {isLoading ? "Loading..." : adminInfo?.username ?? "Unknown"}
      </Typography>

      <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
        {adminInfo?.profile_photo ? (
          <Avatar
            src={
              adminInfo.profile_photo
                ? `https://skywings.alakx.com/storage/profile_photos/${adminInfo.profile_photo}`
                : ""
            }
            alt={adminInfo.username ?? "Profile"}
          />
        ) : (
          <AccountCircle />
        )}
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
  );
}

export default HeaderProfile;
