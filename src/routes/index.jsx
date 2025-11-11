import {useAuth} from "../hooks/auth.jsx";
import AppRoutes from "./app.routes.jsx";
import AuthRoutes from "./auth.routes.jsx";

function IndexRoutes() {
    const { user } = useAuth();
  
    return (
      <>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </>
    );
  }

export default IndexRoutes;