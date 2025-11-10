import {Route, Routes} from "react-router-dom";

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
        </Routes>
    );
}

export default AuthRoutes