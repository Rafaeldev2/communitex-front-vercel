import React from 'react';
    import { Outlet } from 'react-router-dom';
    import ThemeToggle from '../../components/themeToggle';
    import communitexLogo from '../../assets/logo/communitex-logo-transparent.png'

    function AuthLayout() {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-highlight-50 dark:from-neutral-950 dark:via-primary-950 dark:to-secondary-950 flex items-center justify-center p-4">

                <ThemeToggle/>
                {/* Auth Card */}
                <div className="w-full max-w-md">
                    <div className="text-center mb-3">
                        <h1 className="text-3xl font-sans font-bold text-primary-600 dark:text-primary-400">
                            Communitex
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 mt-3">
                            Sistema de Gestão de Adoção de Praças
                        </p>
                    </div>

                    <div className="h-full">
                        <Outlet />
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            © 2025 CommuniTex. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    export default AuthLayout;