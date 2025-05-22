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
import type { FlighDetail } from "@/types/Flight";
import { useMemo } from "react";

export default function FlightDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const headers = useMemo(() => ({}), []);

  const {
    data: flight,
    isLoading,
    error,
  } = useFetchData<FlighDetail>("flights", Number(id), null, headers);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
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
          <Divider sx={{ my: 1 }} />

          <Typography>
            <strong>Departure Airport ID:</strong> {flight.departure_airport_id}
          </Typography>
          <Typography>
            <strong>Arrival Airport ID:</strong> {flight.arrival_airport_id}
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
            <strong>Economy Seats:</strong> {flight.econom_free_seats}
          </Typography>
          <Typography>
            <strong>Business Seats:</strong> {flight.business_free_seats}
          </Typography>
          <Typography>
            <strong>Economy Price:</strong> ${flight.econom_price.toFixed(2)}
          </Typography>
          <Typography>
            <strong>Business Price:</strong> ${flight.business_price.toFixed(2)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
