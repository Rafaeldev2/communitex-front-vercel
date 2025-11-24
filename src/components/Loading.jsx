import React from 'react';

function Loading() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400"></div>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400 font-medium">
                    Carregando...
                </p>
            </div>
        </div>
    );
}

export default Loading;