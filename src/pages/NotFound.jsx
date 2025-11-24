import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
            <div className="card max-w-lg w-full text-center shadow-strong">
                <div className="mb-6">
                    <div className="text-8xl font-sans font-bold text-primary-600 dark:text-primary-400 mb-4">
                        404
                    </div>
                    <h1 className="text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                        Página Não Encontrada
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        A página que você está procurando não existe ou foi movida.
                    </p>
                </div>

                <Link to="/" className="btn-primary inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Voltar para Início
                </Link>
            </div>
        </div>
    );
}

export default NotFound;