import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const loginAsGuest = () => {
    setLoginData({ email: "tomato@mail.com", password: "tomato" });
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
          variant="outlined"
          label="Enter Email"
          type="email"
          required
          name="email"
        />
        <TextField
          sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
          variant="outlined"
          label="Enter Password"
          type="password"
          required
          onChange={(e) =>
            setLoginData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="password"
        />
        <Button
          disabled={
            loginData.email.trimStart().length === 0 ||
            loginData.password.trimStart().length === 0
          }
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
          {status === "loading" ? (
            <CircularProgress size={24} sx={{ color: "#FFF" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <Button
        onClick={loginAsGuest}
        sx={{
          width: "100%",
          margin: ".5rem 0 1rem 0.5rem",
          padding: "12px 0",
          borderRadius: "28px",
        }}
        variant="outlined"
        color="primary"
      >
        {status === "loading" ? "Logging in..." : "Login as guest"}
      </Button>
    </>
  );
}
