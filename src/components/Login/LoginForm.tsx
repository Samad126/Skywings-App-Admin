import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

type Props = {
  error: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: () => void;
};

export default function LoginForm({
  error,
  loading,
  onSubmit,
  onInputChange,
}: Props) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
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
        type="text"
        name="login"
        fullWidth
        required
        onChange={onInputChange}
        margin="normal"
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        fullWidth
        required
        onChange={onInputChange}
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Sign In"}
      </Button>
    </Box>
  );
}
