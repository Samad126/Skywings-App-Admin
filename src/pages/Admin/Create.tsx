import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAdminCreateForm } from "@/hooks/useAdminCreateForm";
import AdminForm from "@/components/Admin/AdminForm";

export default function AdminCreate() {
  const navigate = useNavigate();
  const {
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    error,
    showPassword,
    showPasswordConfirm,
    setShowPassword,
    setShowPasswordConfirm,
  } = useAdminCreateForm();

  return (
    <Box sx={{ maxWidth: 600, mx: "auto"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Add Admin</Typography>
        <Button variant="outlined" onClick={() => navigate("/admin")}>
          Back
        </Button>
      </Box>

      <AdminForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
        showPassword={showPassword}
        showPasswordConfirm={showPasswordConfirm}
        setShowPassword={setShowPassword}
        setShowPasswordConfirm={setShowPasswordConfirm}
        submitLabel="Create Admin"
      />
    </Box>
  );
}
