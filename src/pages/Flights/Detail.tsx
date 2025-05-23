import { useParams, useNavigate } from "react-router";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
} from "@mui/material";
import useFetchData from "@/hooks/useFetchData";
import type { FlightDetail } from "@/types/Flight";
import { useMemo } from "react";

export default function FlightDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const headers = useMemo(() => ({}), []);

  const {
    data: flight,
    isLoading,
    error,
  } = useFetchData<FlightDetail>("flights", Number(id), null, headers);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Flight Details</Typography>
        <Button variant="outlined" onClick={() => navigate("/flights")}>
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
          {error}
        </Alert>
      )}

      {flight && (
        <Box>
          <Typography>
            <strong>ID:</strong> {flight.id}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Flight #{flight.flight_number}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography>
            <strong>From:</strong> {flight.departure_city} –{" "}
            {flight.departure_airport_name}
          </Typography>
          <Typography>
            <strong>To:</strong> {flight.arrival_city} –{" "}
            {flight.arrival_airport_name}
          </Typography>
          <Typography>
            <strong>Flight Date:</strong>{" "}
            {new Date(flight.flight_date).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Arrival Date:</strong>{" "}
            {new Date(flight.arrival_date).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Aircraft:</strong> {flight.aircraft}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <strong>Total Seats:</strong> {flight.total_seats}
          </Typography>
          <Typography>
            <strong>Economy Free:</strong> {flight.econom_free_seats}
          </Typography>
          <Typography>
            <strong>Business Free:</strong> {flight.business_free_seats}
          </Typography>
          <Typography>
            <strong>Booked Seats:</strong> {flight.booked_seats}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <strong>Economy Price:</strong> ${flight.econom_price}
          </Typography>
          <Typography>
            <strong>Business Price:</strong> ${flight.business_price}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary">
            Created At: {new Date(flight.created_at).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Updated At: {new Date(flight.updated_at).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
