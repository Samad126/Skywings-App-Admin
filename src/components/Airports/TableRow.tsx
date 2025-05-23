import type { AirportsResponseItem } from "@/types/Airports";
import { TableCell, TableRow as TableRowMui } from "@mui/material";

function TableRow({ airport }: { airport: AirportsResponseItem }) {
  return (
    <TableRowMui key={airport.id}>
      <TableCell>{airport.id}</TableCell>
      <TableCell>{airport.name}</TableCell>
      <TableCell>{airport.city}</TableCell>
    </TableRowMui>
  );
}

export default TableRow;
