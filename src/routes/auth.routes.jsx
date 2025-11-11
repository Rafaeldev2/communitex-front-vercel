import {Route, Routes} from "react-router-dom";
import {useEffect} from "react";

function SignIn() {
    return null;
}

function SignUp() {
    return null;
}


function AuthRoutes() {


    useEffect(() => {
        console.log("|Passou por aqui - Auth Routes")
    }, []);

    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
        </Routes>
    );
}

export default AuthRoutes