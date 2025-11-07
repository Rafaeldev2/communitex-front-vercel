
function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
        </Routes>
    );
}

export AuthRoutes