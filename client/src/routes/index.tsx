import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
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
  
  {
    name: "Home",
    key: "home",
    path: "/home",
    component: <Home />,
    private: true,
  },
  {
    name: "Profile",
    key: "profile",
    path: "/profile/:userId",
    component: <Profile />,
    private: true,
  },
];





