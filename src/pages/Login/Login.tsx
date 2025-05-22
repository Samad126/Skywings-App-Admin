import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

type FormSubmitType = {
  login: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries()) as FormSubmitType;

    console.log(data);
    navigate("/");
  };

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

        <TextField
          label="Email"
          type="email"
          name="login"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          margin="normal"
          required
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
