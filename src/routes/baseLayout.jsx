import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx';

function BaseLayout({ children, header, sidebar, showFooter = true }) {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col">

            {header && (
                <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50 shadow-soft">
                    {header}
                </header>
            )}


            <div className="flex flex-1">

                {sidebar && (
                    <aside className="hidden lg:block w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
                        {sidebar}
                    </aside>
                )}


                <main className="flex-1 overflow-x-hidden">
                    <div className="container-custom py-8">
                        {children || <Outlet />}
                    </div>
                </main>
            </div>


            {showFooter && <Footer />}
        </div>
    );
}

export default BaseLayout;