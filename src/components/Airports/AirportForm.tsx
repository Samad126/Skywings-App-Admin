import {
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Alert,
  Box,
} from "@mui/material";

type Props = {
  name: string;
  setName: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitError: string | null;
  cities: string[] | null;
  isCitiesLoading: boolean;
  citiesError: string | null;
  submitLabel: string;
};

export default function AirportForm({
  name,
  setName,
  city,
  setCity,
  isSubmitting,
  handleSubmit,
  submitError,
  cities,
  isCitiesLoading,
  citiesError,
  submitLabel,
}: Props) {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {citiesError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load cities: {citiesError}
        </Alert>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <TextField
        label="Airport Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="City"
        select
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        sx={{ mb: 2 }}
        disabled={isCitiesLoading || !cities}
      >
        {isCitiesLoading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : (
          cities?.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))
        )}
      </TextField>

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting || isCitiesLoading}
        fullWidth
      >
        {isSubmitting ? <CircularProgress size={24} /> : submitLabel}
      </Button>
    </Box>
  );
}