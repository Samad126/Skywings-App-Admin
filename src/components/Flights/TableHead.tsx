import { TableCell, TableHead, TableRow } from "@mui/material";

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Flight No.</TableCell>
        <TableCell>Departure</TableCell>
        <TableCell>Arrival</TableCell>
        <TableCell>Flight Date</TableCell>
        <TableCell>Arrival Date</TableCell>
        <TableCell>Aircraft</TableCell>
        <TableCell>Economy Seats</TableCell>
        <TableCell>Business Seats</TableCell>
        <TableCell>Economy Price</TableCell>
        <TableCell>Business Price</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
