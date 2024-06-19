import Home from "../pages/Home";
import Login from "../pages/Login";

export interface RouteItem {
  path: string;
  element: React.ComponentType;
}

export const PublicRoutes: RouteItem[] = [
  { path: "/login", element: Login },
];

export const UserRoutes: RouteItem[] = [
    { path: "/", element: Home }
];
