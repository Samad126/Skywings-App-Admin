import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import useFetchData from "@/hooks/useFetchData";

export default function AirportsCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const headers = useMemo(() => ({}), []);

  const {
    data: cities,
    isLoading: isCitiesLoading,
    error: citiesError,
  } = useFetchData<Array<string>>("enum/cities", null, null, headers);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/airports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, city }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create airport");
      }

      navigate("/airports");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Add New Airport</Typography>
        <Button variant="outlined" onClick={() => navigate("/airports")}>
          Back
        </Button>
      </Box>

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

      <form onSubmit={handleSubmit}>
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
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Create Airport"}
        </Button>
      </form>
    </Box>
  );
}
