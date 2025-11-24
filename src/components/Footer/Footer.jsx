import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
            <div className="container-custom py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="font-sans font-bold text-lg text-primary-600 dark:text-primary-400 mb-4">
                            Communitex
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                            Sistema de gestão para adoção de praças públicas,
                            conectando empresas e comunidades.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Links Rápidos
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                                    Início
                                </Link>
                            </li>
                            <li>
                                <Link to="/sobre" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                                    Sobre
                                </Link>
                            </li>
                            <li>
                                <Link to="/contato" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Contato
                        </h4>
                        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <li>contato@communitex.com.br</li>
                            <li>(11) 9999-9999</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-800 mt-8 pt-6 text-center">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        © {new Date().getFullYear()} CommuniTex. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;