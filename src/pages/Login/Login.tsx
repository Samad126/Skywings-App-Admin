import { useAppContext } from "@/hooks/useAppContext";
import type {
  FormSubmitType,
  Login200Response,
  Login401Response,
  Login422Response,
} from "@/types/Login";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const API_URL: string = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { updateUserData } = useAppContext();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const fd = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries()) as FormSubmitType;

    const response = await fetch(`${API_URL}/admin/signIn/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let responseData:
      | Login200Response
      | Login401Response
      | Login422Response
      | undefined;

    if (!response.ok) {
      if (response.status === 401) {
        responseData = (await response.json()) as Login401Response;
        setError(responseData.message);
      } else if (response.status === 422) {
        responseData = (await response.json()) as Login422Response;
        setError(responseData.errors.password.join(" "));
      } else {
        const fallback = await response.text();
        setError(fallback);
      }

      setLoading(false);
      return;
    }

    responseData = (await response.json()) as Login200Response;

    navigate("/");

    setLoading(false);
  };

  function handleInputChange() {
    setError("");
  }

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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 360,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email or Username"
          type="email"
          name="login"
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
