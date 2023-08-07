import { Navigate } from "react-router";

export default function Logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return (
      <>
        <Navigate to={"/login"} />
      </>
    );
  }
  