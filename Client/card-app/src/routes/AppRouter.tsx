import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PublicRoutes, UserRoutes } from "./RouteData";
import Login from "../pages/Login";
import Home from "../pages/Home";

const AppRouter = () => {

  
  return (
    <Router>
      <Routes>
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
      </Routes>
    </Router>
  );
};

export default AppRouter;
