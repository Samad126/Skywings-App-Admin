import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const airports = [
  {
    id: 1,
    name: "Heathrow Airport",
    city: "London",
  },
  // Add more airport entries here if needed
];
//
export default function AirportIndex() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Airports
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {airports.map((airport) => (
              <TableRow key={airport.id}>
                <TableCell>{airport.id}</TableCell>
                <TableCell>{airport.name}</TableCell>
                <TableCell>{airport.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
