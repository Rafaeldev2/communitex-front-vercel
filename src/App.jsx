import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./hooks/useAuth.jsx";
import AppRoutes from "./routes/index.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;