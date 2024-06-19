import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PublicRoutes, UserRoutes } from "./RouteData";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/redusers/authReducer";

const AppRouter = () => {
  const token = localStorage.getItem("accessToken");
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <Router>
      <ToastContainer position="top-center" />
      <Routes>
        {!isAuthenticated && (
          <>
            {PublicRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<route.element />}
              />
            ))}
            <Route path="/*" element={<Login />} />
          </>
        )}
        {isAuthenticated && token && (
          <>
            {UserRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={<route.element />}
              />
            ))}
            <Route path="/*" element={<Home />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
