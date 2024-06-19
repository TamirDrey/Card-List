import "./App.css";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
