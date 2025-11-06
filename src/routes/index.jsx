export function Routes() {
    const { user } = useAuth();
  
    return (
      <BrowserRouter>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </BrowserRouter>
    );
  }