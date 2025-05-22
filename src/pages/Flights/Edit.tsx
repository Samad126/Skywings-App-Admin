import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import useFetchData from "@/hooks/useFetchData";
import type { AirportsResponseItem } from "@/types/Airports";
import type { FlighDetail } from "@/types/Flight";
import { useAppContext } from "@/hooks/useAppContext";

export default function FlightsEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const flightId = Number(id);

  const { adminId } = useAppContext();
  const requiredHeaders = useMemo(
    () => ({ "user-id": String(adminId) }),
    [adminId]
  );
  const headers = useMemo(() => ({}), []);

  const {
    data: flight,
    isLoading: isFlightLoading,
    error: flightError,
  } = useFetchData<FlighDetail>("flights", flightId, null, requiredHeaders);

  const {
    data: airports,
    isLoading: loadingAirports,
    error: airportError,
  } = useFetchData<AirportsResponseItem[]>("airports", null, null, headers);

  const {
    data: aircrafts,
    isLoading: loadingAircrafts,
    error: aircraftError,
  } = useFetchData<string[]>("enum/aircrafts", null, null, headers);

  const [form, setForm] = useState({
    departure_airport_id: "",
    arrival_airport_id: "",
    flight_date: "",
    arrival_date: "",
    aircraft: "",
    econom_free_seats: "",
    business_free_seats: "",
    econom_price: "",
    business_price: "",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (flight) {
      setForm({
        departure_airport_id: String(flight.departure_airport_id),
        arrival_airport_id: String(flight.arrival_airport_id),
        flight_date: flight.flight_date.slice(0, 16),
        arrival_date: flight.arrival_date.slice(0, 16),
        aircraft: flight.aircraft,
        econom_free_seats: String(flight.econom_free_seats),
        business_free_seats: String(flight.business_free_seats),
        econom_price: String(flight.econom_price),
        business_price: String(flight.business_price),
      });
    }
  }, [flight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flights/${flightId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            departure_airport_id: Number(form.departure_airport_id),
            arrival_airport_id: Number(form.arrival_airport_id),
            econom_free_seats: Number(form.econom_free_seats),
            business_free_seats: Number(form.business_free_seats),
            econom_price: parseFloat(form.econom_price),
            business_price: parseFloat(form.business_price),
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to update flight");
      }

      navigate("/flights");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFlightLoading || !flight) {
    return (
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Edit Flight</Typography>
        <Button variant="outlined" onClick={() => navigate("/flights")}>
          Back
        </Button>
      </Box>

      {(flightError || airportError || aircraftError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load data.
        </Alert>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Departure Airport"
          name="departure_airport_id"
          select
          fullWidth
          required
          value={form.departure_airport_id}
          onChange={handleChange}
          sx={{ mb: 2 }}
          disabled={loadingAirports}
        >
          {airports?.map((airport) => (
            <MenuItem key={airport.id} value={airport.id}>
              {airport.city} - {airport.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Arrival Airport"
          name="arrival_airport_id"
          select
          fullWidth
          required
          value={form.arrival_airport_id}
          onChange={handleChange}
          sx={{ mb: 2 }}
          disabled={loadingAirports}
        >
          {airports?.map((airport) => (
            <MenuItem key={airport.id} value={airport.id}>
              {airport.city} - {airport.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Flight Date/Time"
          name="flight_date"
          type="datetime-local"
          fullWidth
          required
          value={form.flight_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Arrival Date/Time"
          name="arrival_date"
          type="datetime-local"
          fullWidth
          required
          value={form.arrival_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Aircraft"
          name="aircraft"
          select
          fullWidth
          required
          value={form.aircraft}
          onChange={handleChange}
          sx={{ mb: 2 }}
          disabled={loadingAircrafts}
        >
          {aircrafts?.map((ac) => (
            <MenuItem key={ac} value={ac}>
              {ac}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Economy Free Seats"
          name="econom_free_seats"
          type="number"
          fullWidth
          required
          value={form.econom_free_seats}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Business Free Seats"
          name="business_free_seats"
          type="number"
          fullWidth
          required
          value={form.business_free_seats}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Economy Price"
          name="econom_price"
          type="number"
          fullWidth
          required
          value={form.econom_price}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Business Price"
          name="business_price"
          type="number"
          fullWidth
          required
          value={form.business_price}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Update Flight"}
        </Button>
      </form>
    </Box>
  );
}
