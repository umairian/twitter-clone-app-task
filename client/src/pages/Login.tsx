import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../components/LoginForm";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate()
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        borderRadius={theme.shape.borderRadius}
        sx={{
          width: theme.breakpoints.values.sm,
          bgcolor: "#EFF3F4",
          padding: " 3rem 2rem",
        }}
      >
        <Box textAlign="center" marginBottom="1rem">
        <Typography variant="h4" component={"h4"}>
            Twitter Clone App
          </Typography>
          <Typography variant="h6" component={"h6"}>
            Login to your account
          </Typography>
        </Box>
        <LoginForm />
          <Box textAlign="center" margin=".5rem 0">
            Don't have an account?{" "}
            <Link
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Create one
            </Link>
          </Box>
        
      </Box>
    </Box>
  );
}
