import TableHeader from "@/components/Airports/TableHeader";
import TableRow from "@/components/Airports/TableRow";
import useFetchData from "@/hooks/useFetchData";
import type { AirportsResponseItem } from "@/types/Airports";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableContainer,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router";

export default function AirportsIndexPage() {
  const headers = useMemo(() => ({}), []);
  const {
    data: airports,
    isLoading,
    error,
  } = useFetchData<Array<AirportsResponseItem>>(
    "airports",
    null,
    null,
    headers
  );

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
            <TableHeader />
            <TableBody>
              {airports.map((airport) => (
                <TableRow airport={airport} key={airport.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
