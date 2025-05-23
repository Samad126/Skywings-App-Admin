import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useFlightCreateForm } from "@/hooks/useFlightCreateForm";
import FlightForm from "@/components/Flights/FlightForm";

export default function FlightsCreate() {
  const {
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    airports,
    aircrafts,
    loadingAirports,
    loadingAircrafts,
    airportError,
    aircraftError,
    error,
  } = useFlightCreateForm();

  const navigate = useNavigate();

  if (loadingAirports || loadingAircrafts) {
    return (
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Create Flight</Typography>
        <Button variant="outlined" onClick={() => navigate("/flights")}>
          Back
        </Button>
      </Box>

      <FlightForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        airports={airports}
        aircrafts={aircrafts}
        errors={[error, airportError, aircraftError]}
        submitLabel="Create Flight"
      />
    </Box>
  );
}
