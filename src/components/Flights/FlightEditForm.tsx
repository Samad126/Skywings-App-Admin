import {
  Box,
  TextField,
  MenuItem,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import type { AirportsResponseItem } from "@/types/Airports";
import type { FlightFormData } from "@/types/Flight";

type Props = {
  form: FlightFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  airports: AirportsResponseItem[] | null;
  aircrafts: string[] | null;
  errors: (string | null)[];
};

export default function FlightEditForm({
  form,
  handleChange,
  handleSubmit,
  isSubmitting,
  airports,
  aircrafts,
  errors,
}: Props) {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {errors.map(
        (msg, idx) =>
          msg && (
            <Alert severity="error" key={idx} sx={{ mb: 2 }}>
              {msg}
            </Alert>
          )
      )}

      <TextField
        label="Departure Airport"
        name="departure_airport_id"
        select
        fullWidth
        required
        value={form.departure_airport_id}
        onChange={handleChange}
        sx={{ mb: 2 }}
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
    </Box>
  );
}
