import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signUpApi } from "../services/api/Auth";

export default function RegisterForm() {
  const navigate = useNavigate()
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profileUrl: ""
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: signUpApi,
    onError: (error) => {
        console.log(error)
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      navigate("/home");
    },
  });

  return (
    <form onSubmit={onSubmit((values) => mutate(values))}>
      <TextField
        {...getInputProps("name")}
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Name"
        type="text"
        required
      />
      <TextField
        {...getInputProps("email")}
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Email"
        type="email"
        required
      />
      <TextField
        {...getInputProps("password")}
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Password"
        type="password"
        required
      />
      <TextField
        {...getInputProps("profileUrl")}
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Profile Url"
        type="text"
        required
      />
      <Button
        type="submit"
        sx={{
          width: "100%",
          margin: "1.5rem 0",
          padding: "12px 0",
          borderRadius: "28px",
        }}
        variant="contained"
        color="primary"
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "#FFF" }} />
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
