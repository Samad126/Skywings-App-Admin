import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useAirportCreateForm } from "@/hooks/useAirportCreateForm";
import AirportForm from "@/components/Airports/AirportForm";

export default function AirportsCreate() {
  const navigate = useNavigate();
  const {
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
  } = useAirportCreateForm();

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Add New Airport</Typography>
        <Button variant="outlined" onClick={() => navigate("/airports")}>
          Back
        </Button>
      </Box>

      <AirportForm
        name={name}
        setName={setName}
        city={city}
        setCity={setCity}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        submitError={submitError}
        cities={cities}
        isCitiesLoading={isCitiesLoading}
        citiesError={citiesError}
        submitLabel="Create Airport"
      />
    </Box>
  );
}
