import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = {
  form: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  error: string | null;
  showPassword: boolean;
  showPasswordConfirm: boolean;
  setShowPassword: (val: boolean) => void;
  setShowPasswordConfirm: (val: boolean) => void;
  submitLabel: string;
};

export default function AdminForm({
  form,
  handleChange,
  handleSubmit,
  isSubmitting,
  error,
  showPassword,
  showPasswordConfirm,
  setShowPassword,
  setShowPasswordConfirm,
  submitLabel,
}: Props) {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Username"
        name="username"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={form.username}
        onChange={handleChange}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={form.email}
        onChange={handleChange}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        fullWidth
        required
        sx={{ mb: 2 }}
        value={form.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Confirm Password"
        name="password_confirmation"
        type={showPasswordConfirm ? "text" : "password"}
        fullWidth
        required
        sx={{ mb: 3 }}
        value={form.password_confirmation}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : submitLabel}
      </Button>
    </Box>
  );
}
