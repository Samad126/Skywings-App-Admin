import { TableCell, TableHead, TableRow } from "@mui/material";

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>City</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
