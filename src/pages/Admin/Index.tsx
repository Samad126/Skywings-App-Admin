import useFetchData from "@/hooks/useFetchData";
import type { AdminDetail } from "@/types/Admin";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Alert,
  Avatar,
  Button,
} from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router";

export default function AdminIndex() {
  const headers = useMemo(() => ({}), []);

  const {
    data: admins,
    isLoading,
    error,
  } = useFetchData<Array<AdminDetail>>("admin", null, null, headers);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Admin Users
        </Typography>
        <Button component={Link} to="create" variant="contained">
          Add Admin
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load admins: {error}
        </Alert>
      )}

      {!isLoading && !error && admins && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Profile</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>{admin.id}</TableCell>
                  <TableCell>
                    {admin.profile_photo ? (
                      <Avatar
                        alt={admin.username || "Admin"}
                        src={admin.profile_photo}
                      />
                    ) : (
                      <Avatar>{admin.username?.[0] ?? "A"}</Avatar>
                    )}
                  </TableCell>
                  <TableCell>{admin.username ?? "-"}</TableCell>
                  <TableCell>{admin.email ?? "-"}</TableCell>
                  <TableCell>
                    {admin.created_at
                      ? new Date(admin.created_at).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`${admin.id}`}
                      size="small"
                      variant="outlined"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
