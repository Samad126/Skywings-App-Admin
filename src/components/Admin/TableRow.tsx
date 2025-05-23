import type { AdminDetail } from "@/types/Admin";
import {
  Avatar,
  Button,
  TableCell,
  TableRow as TableRowMui,
} from "@mui/material";
import { Link } from "react-router";

function TableRow({ admin }: { admin: AdminDetail }) {
  return (
    <TableRowMui key={admin.id}>
      <TableCell>{admin.id}</TableCell>
      <TableCell>
        {admin.profile_photo ? (
          <Avatar alt={admin.username || "Admin"} src={admin.profile_photo} />
        ) : (
          <Avatar>{admin.username?.[0] ?? "A"}</Avatar>
        )}
      </TableCell>
      <TableCell>{admin.username ?? "-"}</TableCell>
      <TableCell>{admin.email ?? "-"}</TableCell>
      <TableCell>
        {admin.created_at
          ? new Date(admin.created_at).toLocaleDateString()
          : "-"}
      </TableCell>
      <TableCell>
        <Button
          component={Link}
          to={`${admin.id}`}
          size="small"
          variant="outlined"
        >
          View Details
        </Button>
      </TableCell>
    </TableRowMui>
  );
}

export default TableRow;
