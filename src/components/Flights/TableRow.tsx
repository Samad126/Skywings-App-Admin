import {
  TableRow as TableRowMui,
  TableCell,
  Button,
  Stack,
} from "@mui/material";
import DeleteButton from "./DeleteButton";
import type { FlightDetail } from "@/types/Flight";
import { useNavigate } from "react-router";
import type { TruncateCell } from "@/types/etc";

type TableRowProps = {
  flight: FlightDetail;
  adminId: number | null;
  refetch: () => void;
  truncateCell: TruncateCell;
};

function TableRow({ flight, adminId, refetch, truncateCell }: TableRowProps) {
  const navigate = useNavigate();

  return (
    <TableRowMui>
      <TableCell>{flight.id}</TableCell>
      <TableCell sx={truncateCell}>{flight.flight_number}</TableCell>
      <TableCell sx={truncateCell}>
        {flight.departure_city} - {flight.departure_airport_name}
      </TableCell>
      <TableCell sx={truncateCell}>
        {flight.arrival_city} - {flight.arrival_airport_name}
      </TableCell>
      <TableCell sx={truncateCell}>{new Date(flight.flight_date).toLocaleString()}</TableCell>
      <TableCell sx={truncateCell}>{new Date(flight.arrival_date).toLocaleString()}</TableCell>
      <TableCell sx={truncateCell}>{flight.aircraft}</TableCell>
      <TableCell sx={truncateCell}>{flight.econom_free_seats}</TableCell>
      <TableCell sx={truncateCell}>{flight.business_free_seats}</TableCell>
      <TableCell sx={truncateCell}>${flight.econom_price}</TableCell>
      <TableCell sx={truncateCell}>${flight.business_price}</TableCell>
      <TableCell sx={truncateCell}>
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
