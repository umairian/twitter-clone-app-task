import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import RegisterForm from "../components/RegisterForm";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
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
            Create New Account
          </Typography>
        </Box>
        <RegisterForm />
        <Box textAlign="center" margin=".5rem 0">
          Already registered?{" "}
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Sign in
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
