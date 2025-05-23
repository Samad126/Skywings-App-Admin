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
  Pagination,
} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router";
import { useAppContext } from "@/hooks/useAppContext";
import type { FlightsResponse } from "@/types/Flight";
import useFetchData from "@/hooks/useFetchData";

export default function FlightsIndex() {
  const { adminId } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const initialDate = searchParams.get("date") ?? today;
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [page, setPage] = useState(initialPage);

  const query = `date=${selectedDate}&page=${page}`;
  const headers = useMemo(() => ({ "user-id": String(adminId) }), [adminId]);

  const {
    data: flights,
    isLoading,
    error,
    refetch,
  } = useFetchData<FlightsResponse>("flights", null, query, headers);

  const flightsArr = flights?.data || [];

  useEffect(() => {
    setSearchParams({ date: selectedDate, page: String(page) });
  }, [selectedDate, page, setSearchParams]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this flight?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/flights/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "user-id": String(adminId),
        },
      });
      if (!res.ok) throw new Error((await res.text()) || "Delete failed");
      refetch();
    } catch (err) {
      alert(
        "Error deleting flight: " + (err instanceof Error ? err.message : "")
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
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setPage(1);
          }}
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
        <>
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
                {flightsArr.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>{f.id}</TableCell>
                    <TableCell>{f.departure_airport_id}</TableCell>
                    <TableCell>{f.arrival_airport_id}</TableCell>
                    <TableCell>
                      {new Date(f.flight_date).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(f.arrival_date).toLocaleString()}
                    </TableCell>
                    <TableCell>{f.aircraft}</TableCell>
                    <TableCell>{f.econom_free_seats}</TableCell>
                    <TableCell>{f.business_free_seats}</TableCell>
                    <TableCell>${f.econom_price}</TableCell>
                    <TableCell>${f.business_price}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`${f.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate(`${f.id}/edit`)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(f.id)}
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={flights.last_page ?? 1}
              page={flights.current_page ?? 1}
              onChange={(_, v) => setPage(v)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
