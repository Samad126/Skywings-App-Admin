import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Container, Typography, Button } from "@mui/material";

function ErrorElement() {
  const error = useRouteError();
  const navigate = useNavigate();

  const getMessage = () => {
    console.log(error);
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) return "Page not found.";
      return `Error ${error.status}: ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    }
    return "Something went wrong.";
  };

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {getMessage()}
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Container>
  );
}

export default ErrorElement;
