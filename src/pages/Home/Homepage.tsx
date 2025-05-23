import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to SkyWings Admin Portal
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Manage flights, airports, and administrators efficiently.
      </Typography>

      <Stack
        direction="column"
        spacing={2}
        sx={{ width: "100%", maxWidth: 300 }}
      >
        <Button variant="contained" onClick={() => navigate("/flights")}>
          Manage Flights
        </Button>
        <Button variant="contained" onClick={() => navigate("/airports")}>
          Manage Airports
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin")}>
          Manage Admins
        </Button>
      </Stack>
    </Box>
  );
}
