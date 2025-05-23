import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useFlightEditForm } from "@/hooks/useFlightEditForm";
import FlightForm from "@/components/Flights/FlightForm";

export default function FlightsEdit() {
  const {
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    isFlightLoading,
    flightError,
    airportError,
    aircraftError,
    airports,
    aircrafts,
    submitError,
    loadingAircrafts,
    loadingAirports
  } = useFlightEditForm();

  const navigate = useNavigate();

  if (isFlightLoading || loadingAirports || loadingAircrafts || !form) {
    return (
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Edit Flight</Typography>
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
        errors={[flightError, airportError, aircraftError, submitError]}
        submitLabel="Update Flight"
      />
    </Box>
  );
}
