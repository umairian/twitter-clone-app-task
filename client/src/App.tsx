import { Route, Routes } from "react-router";
import { CustomRoute, routes } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthContext } from "./contexts/Auth";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const token = localStorage.getItem("token") || null;
  let user = localStorage.getItem("user");

  if(user !== null && !user) {
    user = JSON.parse(user);
  }

  const getRoutes = (allRoutes: CustomRoute[]) =>
    allRoutes.map((route) => (
      <Route
        path={route.path}
        element={
          route.private ? (
            <PrivateRoute
              token={token}
              navigateTo={"/login"}
            >
              {route.component}
            </PrivateRoute>
          ) : (
            route.component
          )
        }
        key={route.key}
      />
    ));

  return (
    <AuthContext.Provider value={{ user, token }}>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </AuthContext.Provider>
  );
}

export default App;
