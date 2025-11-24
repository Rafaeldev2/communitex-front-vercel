import React from 'react';
                        import { Link, useNavigate } from 'react-router-dom';

                        function UnauthorizedAccess() {
                            const navigate = useNavigate();

                            return (
                                <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
                                    <div className="card max-w-lg w-full text-center shadow-strong">
                                        <div className="mb-6">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error-100 dark:bg-error-900/30 mb-4">
                                                <svg className="w-10 h-10 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            </div>
                                            <h1 className="text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                                                Acesso Negado
                                            </h1>
                                            <p className="text-neutral-600 dark:text-neutral-400">
                                                Você não tem permissão para acessar esta página.
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <button
                                                onClick={() => navigate(-1)}
                                                className="btn-secondary"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                </svg>
                                                Voltar
                                            </button>
                                            <Link to="/" className="btn-primary">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                Ir para Início
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        export default UnauthorizedAccess;