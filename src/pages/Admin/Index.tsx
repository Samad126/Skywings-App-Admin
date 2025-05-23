import TableHeader from "@/components/Admin/TableHeader";
import TableRow from "@/components/Admin/TableRow";
import useFetchData from "@/hooks/useFetchData";
import type { AdminDetail } from "@/types/Admin";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Alert,
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
            <TableHeader />
            <TableBody>
              {admins.map((admin) => (
                <TableRow admin={admin} key={admin.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
