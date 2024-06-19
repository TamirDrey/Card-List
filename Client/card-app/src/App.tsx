import "./App.css";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { useAuthMeQuery } from "./store/services/auth-api";

function App() {
  const token = localStorage.getItem("accessToken");
  const { error, isLoading } = useAuthMeQuery(null, {
    skip: token ? false : true,
  });

  return (
    <>{isLoading ? <h1>Loading</h1> : error ? <h1>Error</h1> : <AppRouter />}</>
  );
}

export default App;
