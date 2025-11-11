import {useAuth} from "../hooks/auth.jsx";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./app.routes.jsx";
import AuthRoutes from "./auth.routes.jsx";

export function IndexRoutes() {
    const { user } = useAuth();
  
    return (
      <>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </>
    );
  }