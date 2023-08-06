import Login from "../pages/Login";
import Signup from "../pages/Signup";

export interface CustomRoute {
  name: string;
  key: string;
  path: string;
  component: React.ReactNode;
  private: boolean;
}

export const routes: CustomRoute[] = [
  {
    name: "Login",
    key: "login",
    path: "/login",
    component: <Login />,
    private: false,
  },
  {
    name: "Signup",
    key: "signup",
    path: "/signup",
    component: <Signup />,
    private: false,
  },
];





