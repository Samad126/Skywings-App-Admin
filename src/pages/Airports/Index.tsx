import useFetchData from "@/hooks/useFetchData";
import type { AirportsResponseItem } from "@/types/Airports";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link } from "react-router";

export default function AirportsIndexPage() {
  const {
    data: airports,
    error,
    isLoading,
  } = useFetchData<Array<AirportsResponseItem>>("airports");

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
          Airports
        </Typography>
        <Button component={Link} to="/airports/create" variant="contained">
          Add Airport
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load airports: {error || "Unknown error"}
        </Alert>
      )}

      {!isLoading && !error && airports && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {airports.map((airport) => (
                <TableRow key={airport.id}>
                  <TableCell>{airport.id}</TableCell>
                  <TableCell>{airport.name}</TableCell>
                  <TableCell>{airport.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
