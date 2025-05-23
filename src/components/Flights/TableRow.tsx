import {
  TableRow as TableRowMui,
  TableCell,
  Button,
  Stack,
} from "@mui/material";
import DeleteButton from "./DeleteButton";
import type { FlightDetail } from "@/types/Flight";
import { useNavigate } from "react-router";

type TableRowProps = {
  flight: FlightDetail;
  adminId: number | null;
  refetch: () => void;
};

function TableRow({ flight, adminId, refetch }: TableRowProps) {
  const navigate = useNavigate();

  return (
    <TableRowMui>
      <TableCell>{flight.id}</TableCell>
      <TableCell>{flight.flight_number}</TableCell>
      <TableCell>
        {flight.departure_city} - {flight.departure_airport_name}
      </TableCell>
      <TableCell>
        {flight.arrival_city} - {flight.arrival_airport_name}
      </TableCell>
      <TableCell>{new Date(flight.flight_date).toLocaleString()}</TableCell>
      <TableCell>{new Date(flight.arrival_date).toLocaleString()}</TableCell>
      <TableCell>{flight.aircraft}</TableCell>
      <TableCell>{flight.econom_free_seats}</TableCell>
      <TableCell>{flight.business_free_seats}</TableCell>
      <TableCell>${flight.econom_price}</TableCell>
      <TableCell>${flight.business_price}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`${flight.id}`)}
          >
            View
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => navigate(`${flight.id}/edit`)}
          >
            Edit
          </Button>
          <DeleteButton
            adminId={adminId}
            flightId={flight.id}
            refetch={refetch}
          />
        </Stack>
      </TableCell>
    </TableRowMui>
  );
}

export default TableRow;