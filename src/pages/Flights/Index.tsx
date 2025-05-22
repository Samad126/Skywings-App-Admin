import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from "@mui/material";

import { useSearchParams, useNavigate } from "react-router";
import { useAppContext } from "@/hooks/useAppContext";
import type { FlightsResponse } from "@/types/Flight";
import useFetchData from "@/hooks/useFetchData";

export default function FlightsIndex() {
  const { adminId } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const today: string = new Date().toISOString().split("T")[0];
  const initialDate = searchParams.get("date") ?? today;
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const query = selectedDate ? `date=${selectedDate}` : null;
  const headers = useMemo(() => ({ "user-id": String(adminId) }), [adminId]);

  const {
    data: flights,
    isLoading,
    error,
    refetch,
  } = useFetchData<FlightsResponse>("flights", null, query, headers);

  const flightsArr = flights?.data || [];

  useEffect(() => {
    if (selectedDate) {
      setSearchParams({ date: selectedDate });
    } else {
      setSearchParams({});
    }
  }, [selectedDate, setSearchParams]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this flight?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flights/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "user-id": String(adminId),
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to delete flight");
      }

      refetch();
    } catch (err) {
      alert(
        "Error deleting flight: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4">Flights by Date</Typography>
        <Button variant="contained" onClick={() => navigate("create")}>
          Create Flight
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Flight Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!isLoading && flights && (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 1100 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Departure Airport</TableCell>
                <TableCell>Arrival Airport</TableCell>
                <TableCell>Flight Date</TableCell>
                <TableCell>Arrival Date</TableCell>
                <TableCell>Aircraft</TableCell>
                <TableCell>Economy Seats</TableCell>
                <TableCell>Business Seats</TableCell>
                <TableCell>Economy Price</TableCell>
                <TableCell>Business Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flightsArr.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell>{flight.id}</TableCell>
                  <TableCell>{flight.departure_airport_id}</TableCell>
                  <TableCell>{flight.arrival_airport_id}</TableCell>
                  <TableCell>
                    {new Date(flight.flight_date).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(flight.arrival_date).toLocaleString()}
                  </TableCell>
                  <TableCell>{flight.aircraft}</TableCell>
                  <TableCell>{flight.econom_free_seats}</TableCell>
                  <TableCell>{flight.business_free_seats}</TableCell>
                  <TableCell>${flight.econom_price.toFixed(2)}</TableCell>
                  <TableCell>${flight.business_price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/flights/${flight.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(`${flight.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(flight.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
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
