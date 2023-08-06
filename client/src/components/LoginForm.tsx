import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";
import { loginApi } from "../services/api/Auth";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
  const navigate = useNavigate()
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: loginApi,
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
    <>
      <form onSubmit={onSubmit((values) => mutate(values))}>
        <TextField
          sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
          variant="outlined"
          label="Enter Email"
          type="email"
          required
          {...getInputProps("email")}
        />
        <TextField
          sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
          variant="outlined"
          label="Enter Password"
          type="password"
          required
          {...getInputProps("password")}
        />
        <Button
          sx={{
            width: "100%",
            margin: "1.5rem 0",
            padding: "12px 0",
            borderRadius: "28px",
          }}
          variant="contained"
          color="primary"
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "#FFF" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </>
  );
}
