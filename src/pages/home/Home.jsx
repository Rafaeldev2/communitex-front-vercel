import React from 'react';
      import { Link } from 'react-router-dom';
      import { useAuth } from '../../hooks/useAuth';


      function Home() {
          const { isAuthenticated, user } = useAuth();

          return (
              <div className="space-y-16">
                  {/* Hero Section */}
                  <section className="relative py-20 px-4">
                      <div className="max-w-4xl mx-auto text-center">
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-6">
                              Transforme <span className="text-primary-600 dark:text-primary-400">Espaços Públicos</span> em
                              <span className="text-secondary-600 dark:text-secondary-400"> Comunidades Vibrantes</span>
                          </h1>
                          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                              Conectamos empresas e comunidades para revitalizar praças públicas através do programa de adoção.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              {!isAuthenticated() ? (
                                  <>
                                      <Link to="/login" className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors shadow-soft text-center font-medium">
                                          Começar Agora
                                      </Link>
                                      <Link to="/sobre" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors text-center font-medium">
                                          Saiba Mais
                                      </Link>
                                  </>
                              ) : (
                                  <Link to={user?.role === 'ADMIN' ? '/admin' : '/empresa'} className="btn-primary">
                                      Ir para Dashboard
                                  </Link>
                              )}
                          </div>
                      </div>
                  </section>

                  {/* Features Section */}
                  <section className="py-16">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                              Como Funciona
                          </h2>
                          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                              Um processo simples para transformar espaços urbanos
                          </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {[
                              {
                                  icon: (
                                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                      </svg>
                                  ),
                                  title: 'Cadastre sua Praça',
                                  description: 'Administradores cadastram praças públicas que precisam de manutenção e melhorias.'
                              },
                              {
                                  icon: (
                                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                      </svg>
                                  ),
                                  title: 'Empresas Adotam',
                                  description: 'Empresas escolhem praças para adotar e contribuir com a comunidade local.'
                              },
                              {
                                  icon: (
                                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                      </svg>
                                  ),
                                  title: 'Comunidade Ganha',
                                  description: 'Espaços públicos revitalizados melhoram a qualidade de vida de todos.'
                              }
                          ].map((feature, index) => (
                              <div key={index} className="card text-center hover:shadow-strong transition-all duration-300">
                                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 mx-auto">
                                      {feature.icon}
                                  </div>
                                  <h3 className="text-xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                                      {feature.title}
                                  </h3>
                                  <p className="text-neutral-600 dark:text-neutral-400">
                                      {feature.description}
                                  </p>
                              </div>
                          ))}
                      </div>
                  </section>

                  {/* CTA Section */}
                  <section className="py-16">
                      <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 text-center">
                          <h2 className="text-3xl md:text-4xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                              Pronto para Fazer a Diferença?
                          </h2>
                          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                              Junte-se a nós e ajude a transformar espaços públicos em lugares melhores para todos.
                          </p>
                          {!isAuthenticated() && (
                              <Link to="/login" className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-neutral-100 transition-colors shadow-soft inline-block font-medium">
                                  Comece Agora
                              </Link>
                          )}
                      </div>
                  </section>
              </div>
          );
      }

      export default Home;