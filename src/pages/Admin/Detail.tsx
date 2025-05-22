import { useParams, useNavigate } from "react-router";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import useFetchData from "@/hooks/useFetchData";
import type { AdminDetail } from "@/types/Admin";

export default function AdminDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: admin,
    isLoading,
    error,
  } = useFetchData<AdminDetail>("admin", Number(id));

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Admin Details</Typography>
        <Button variant="outlined" onClick={() => navigate("/admin")}>
          Back
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load admin: {error}
        </Alert>
      )}

      {!isLoading && !error && admin && (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src={admin.profile_photo || undefined}
              sx={{ width: 64, height: 64, mr: 2 }}
            >
              {admin.username?.[0]?.toUpperCase() ?? "A"}
            </Avatar>
            <Box>
              <Typography variant="h6">{admin.username ?? "N/A"}</Typography>
              <Typography variant="body2" color="text.secondary">
                {admin.email ?? "N/A"}
              </Typography>
            </Box>
          </Box>

          <Typography>
            <strong>ID:</strong> {admin.id}
          </Typography>
          <Typography>
            <strong>Created At:</strong>{" "}
            {admin.created_at
              ? new Date(admin.created_at).toLocaleString()
              : "N/A"}
          </Typography>
          <Typography>
            <strong>Updated At:</strong>{" "}
            {admin.updated_at
              ? new Date(admin.updated_at).toLocaleString()
              : "N/A"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
