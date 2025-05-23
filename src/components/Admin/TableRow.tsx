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
        <Avatar
          src={
            admin.profile_photo
              ? `https://skywings.alakx.com/storage/profile_photos/${admin.profile_photo}`
              : undefined
          }
        >
          {admin.username?.[0]?.toUpperCase() ?? "A"}
        </Avatar>
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
