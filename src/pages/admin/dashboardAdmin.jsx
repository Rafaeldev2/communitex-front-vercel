import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function DashboardAdmin() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalPracas: 0,
        pracasDisponiveis: 0,
        totalEmpresas: 0,
        adocoesAtivas: 0
    });

    useEffect(() => {
        // Aqui você faria a chamada para buscar as estatísticas
        // Exemplo mockado:
        setStats({
            totalPracas: 45,
            pracasDisponiveis: 12,
            totalEmpresas: 28,
            adocoesAtivas: 33
        });
    }, []);

    const statCards = [
        {
            title: 'Total de Praças',
            value: stats.totalPracas,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            color: 'primary',
            link: '/admin/pracas'
        },
        {
            title: 'Praças Disponíveis',
            value: stats.pracasDisponiveis,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'success',
            link: '/admin/pracas'
        },
        {
            title: 'Total de Empresas',
            value: stats.totalEmpresas,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            color: 'secondary',
            link: '/admin/empresas'
        },
        {
            title: 'Adoções Ativas',
            value: stats.adocoesAtivas,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            color: 'highlight',
            link: '/admin/adocoes'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    Dashboard Administrativo
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Bem-vindo de volta, {user?.name || 'Administrador'}!
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <Link
                        key={index}
                        to={stat.link}
                        className="card hover:shadow-strong transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                {stat.icon}
                            </div>
                            <svg className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                            {stat.title}
                        </h3>
                        <p className="text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-50">
                            {stat.value}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="card">
                <h2 className="text-xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                    Ações Rápidas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link to="/admin/pracas" className="btn-primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nova Praça
                    </Link>
                    <Link to="/admin/empresas" className="btn-secondary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nova Empresa
                    </Link>
                    <Link to="/admin/adocoes" className="btn-outline">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver Adoções
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;