import { Button } from "@mui/material";

type BtnDelete = {
  adminId: number | null;
  refetch: () => void;
  flightId: number;
  setIsDeleting: (deleting: boolean) => void;
};

function DeleteButton({
  adminId,
  refetch,
  flightId,
  setIsDeleting,
}: BtnDelete) {
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this flight?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/flights/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "user-id": String(adminId),
        },
      });
      if (!res.ok) throw new Error((await res.text()) || "Delete failed");
      refetch();
    } catch (err) {
      alert(
        "Error deleting flight: " + (err instanceof Error ? err.message : "")
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      size="small"
      variant="outlined"
      color="error"
      onClick={() => handleDelete(flightId)}
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
