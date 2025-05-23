import { Box } from "@mui/material";
import { useLoginForm } from "@/hooks/useLoginForm";
import LoginForm from "@/components/Login/LoginForm";

const LoginPage = () => {
  const { handleSubmit, clearError, loading, error } = useLoginForm();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <LoginForm
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
        onInputChange={clearError}
      />
    </Box>
  );
};

export default LoginPage;
