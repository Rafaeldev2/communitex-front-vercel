import {Route, Routes} from "react-router-dom";

function SignIn() {
    return null;
}

function SignUp() {
    return null;
}

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
        </Routes>
    );
}

export default AuthRoutes