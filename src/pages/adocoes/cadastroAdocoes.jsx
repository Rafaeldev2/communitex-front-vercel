import React, { useEffect, useState } from "react";
        import adocaoService from "../../services/adocaoService/adocaoService";
        import pracaService from "../../services/pracaService/pracaService";
        import empresaService from "../../services/empresaService/empresaService";
        import { useToast } from "../../hooks/useToast";

        function CadastroAdocoes() {
            const { showSuccess, showError, showWarning, showPromise } = useToast();

            const [adocoes, setAdocoes] = useState([]);
            const [adocaoSelecionada, setAdocaoSelecionada] = useState(null);
            const [pracas, setPracas] = useState([]);
            const [empresas, setEmpresas] = useState([]);
            const [loading, setLoading] = useState(false);

            const [inputPracaId, setInputPracaId] = useState('');
            const [inputEmpresaId, setInputEmpresaId] = useState('');
            const [inputDataInicio, setInputDataInicio] = useState('');
            const [inputDataFim, setInputDataFim] = useState('');
            const [inputStatus, setInputStatus] = useState('PENDENTE');
            const [inputObservacoes, setInputObservacoes] = useState('');

            const fetchAdocoes = async () => {
                try {
                    setLoading(true);
                    const data = await adocaoService.getAll();
                    setAdocoes(Array.isArray(data) ? data : []);
                } catch (error) {
                    console.error('Erro ao buscar adoções:', error);
                    showError('Erro ao carregar lista de adoções');
                } finally {
                    setLoading(false);
                }
            };

            const fetchPracas = async () => {
                try {
                    const data = await pracaService.getAll();
                    setPracas(Array.isArray(data) ? data : []);
                } catch (error) {
                    console.error('Erro ao buscar praças:', error);
                    showError('Erro ao carregar praças');
                }
            };

            const fetchEmpresas = async () => {
                try {
                    const data = await empresaService.getAll();
                    setEmpresas(Array.isArray(data) ? data : []);
                } catch (error) {
                    console.error('Erro ao buscar empresas:', error);
                    showError('Erro ao carregar empresas');
                }
            };

            useEffect(() => {
                fetchAdocoes();
                fetchPracas();
                fetchEmpresas();
            }, []);

            const cadastrarAdocao = async () => {
                if (!inputPracaId || !inputEmpresaId || !inputDataInicio) {
                    showWarning('Preencha todos os campos obrigatórios');
                    return;
                }

                try {
                    setLoading(true);
                    const adocao = {
                        pracaId: parseInt(inputPracaId),
                        empresaId: parseInt(inputEmpresaId),
                        dataInicio: inputDataInicio,
                        dataFim: inputDataFim || null,
                        status: inputStatus,
                        observacoes: inputObservacoes
                    };

                    await showPromise(
                        adocaoService.create(adocao),
                        {
                            pending: 'Cadastrando adoção...',
                            success: 'Adoção cadastrada com sucesso!',
                            error: 'Erro ao cadastrar adoção'
                        }
                    );

                    await fetchAdocoes();
                    limparForm();
                } catch (error) {
                    console.error('Erro ao adicionar adoção:', error);
                    const errorMessage = error.response?.data?.message || 'Erro ao cadastrar adoção';
                    showError(errorMessage);
                } finally {
                    setLoading(false);
                }
            };

            const salvarAdocao = async () => {
                if (!inputPracaId || !inputEmpresaId || !inputDataInicio) {
                    showWarning('Preencha todos os campos obrigatórios');
                    return;
                }

                try {
                    setLoading(true);
                    const adocao = {
                        pracaId: parseInt(inputPracaId),
                        empresaId: parseInt(inputEmpresaId),
                        dataInicio: inputDataInicio,
                        dataFim: inputDataFim || null,
                        status: inputStatus,
                        observacoes: inputObservacoes
                    };

                    await showPromise(
                        adocaoService.update(adocaoSelecionada.id, adocao),
                        {
                            pending: 'Atualizando adoção...',
                            success: 'Adoção atualizada com sucesso!',
                            error: 'Erro ao atualizar adoção'
                        }
                    );

                    await fetchAdocoes();
                    setAdocaoSelecionada(null);
                    limparForm();
                } catch (error) {
                    console.error('Erro ao atualizar adoção:', error);
                    const errorMessage = error.response?.data?.message || 'Erro ao atualizar adoção';
                    showError(errorMessage);
                } finally {
                    setLoading(false);
                }
            };

            const buscarAdocaoPorId = async (id) => {
                try {
                    const adocao = await adocaoService.getById(id);
                    setAdocaoSelecionada(adocao);
                    exibirAdocao(adocao);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    showInfo('Editando adoção selecionada');
                } catch (error) {
                    console.error('Erro ao buscar adoção por ID:', error);
                    showError('Erro ao carregar dados da adoção');
                }
            };

            const deletarAdocao = async (id) => {
                if (!window.confirm('Tem certeza que deseja deletar esta adoção?')) return;

                try {
                    setLoading(true);

                    await showPromise(
                        adocaoService.delete(id),
                        {
                            pending: 'Deletando adoção...',
                            success: 'Adoção deletada com sucesso!',
                            error: 'Erro ao deletar adoção'
                        }
                    );

                    await fetchAdocoes();
                } catch (error) {
                    console.error('Erro ao deletar adoção:', error);
                    const errorMessage = error.response?.data?.message || 'Erro ao deletar adoção';
                    showError(errorMessage);
                } finally {
                    setLoading(false);
                }
            };

            const aprovarAdocao = async (id) => {
                try {
                    setLoading(true);

                    await showPromise(
                        adocaoService.aprovar(id),
                        {
                            pending: 'Aprovando adoção...',
                            success: 'Adoção aprovada com sucesso!',
                            error: 'Erro ao aprovar adoção'
                        }
                    );

                    await fetchAdocoes();
                } catch (error) {
                    console.error('Erro ao aprovar adoção:', error);
                    const errorMessage = error.response?.data?.message || 'Erro ao aprovar adoção';
                    showError(errorMessage);
                } finally {
                    setLoading(false);
                }
            };

            const rejeitarAdocao = async (id) => {
                try {
                    setLoading(true);

                    await showPromise(
                        adocaoService.rejeitar(id),
                        {
                            pending: 'Rejeitando adoção...',
                            success: 'Adoção rejeitada!',
                            error: 'Erro ao rejeitar adoção'
                        }
                    );

                    await fetchAdocoes();
                } catch (error) {
                    console.error('Erro ao rejeitar adoção:', error);
                    const errorMessage = error.response?.data?.message || 'Erro ao rejeitar adoção';
                    showError(errorMessage);
                } finally {
                    setLoading(false);
                }
            };

            function limparForm() {
                setInputPracaId('');
                setInputEmpresaId('');
                setInputDataInicio('');
                setInputDataFim('');
                setInputStatus('PENDENTE');
                setInputObservacoes('');
                setAdocaoSelecionada(null);
            }

            function exibirAdocao(adocao) {
                setInputPracaId(adocao.praca?.id || adocao.pracaId || '');
                setInputEmpresaId(adocao.empresa?.id || adocao.empresaId || '');
                setInputDataInicio(adocao.dataInicio || '');
                setInputDataFim(adocao.dataFim || '');
                setInputStatus(adocao.status || 'PENDENTE');
                setInputObservacoes(adocao.observacoes || '');
            }

            const getStatusBadge = (status) => {
                const badges = {
                    PENDENTE: 'badge-warning',
                    APROVADA: 'badge-success',
                    REJEITADA: 'badge-error',
                    ATIVA: 'badge-info',
                    FINALIZADA: 'badge-primary'
                };
                return badges[status] || 'badge-primary';
            };

            return (
                <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
                    <div className="container-custom section">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                                Gestão de Adoções
                            </h1>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Gerencie as adoções de praças por empresas
                            </p>
                        </div>

                        {/* Formulário */}
                        <div className="card mb-8 animate-slide-up">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                                    {adocaoSelecionada ? 'Editar Adoção' : 'Nova Adoção'}
                                </h2>
                                {adocaoSelecionada && (
                                    <button
                                        onClick={limparForm}
                                        className="btn btn-ghost text-sm"
                                    >
                                        Cancelar edição
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="label">Praça *</label>
                                    <select
                                        value={inputPracaId}
                                        onChange={(e) => setInputPracaId(e.target.value)}
                                        className="select"
                                        required
                                    >
                                        <option value="">Selecione uma praça</option>
                                        {pracas.map((praca) => (
                                            <option key={praca.id} value={praca.id}>
                                                {praca.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="label">Empresa *</label>
                                    <select
                                        value={inputEmpresaId}
                                        onChange={(e) => setInputEmpresaId(e.target.value)}
                                        className="select"
                                        required
                                    >
                                        <option value="">Selecione uma empresa</option>
                                        {empresas.map((empresa) => (
                                            <option key={empresa.id} value={empresa.id}>
                                                {empresa.nomeFantasia || empresa.razaoSocial}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="label">Data de Início *</label>
                                    <input
                                        type="date"
                                        value={inputDataInicio}
                                        onChange={(e) => setInputDataInicio(e.target.value)}
                                        className="input"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">Data de Fim</label>
                                    <input
                                        type="date"
                                        value={inputDataFim}
                                        onChange={(e) => setInputDataFim(e.target.value)}
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="label">Status</label>
                                    <select
                                        value={inputStatus}
                                        onChange={(e) => setInputStatus(e.target.value)}
                                        className="select"
                                    >
                                        <option value="PENDENTE">PENDENTE</option>
                                        <option value="APROVADA">APROVADA</option>
                                        <option value="REJEITADA">REJEITADA</option>
                                        <option value="ATIVA">ATIVA</option>
                                        <option value="FINALIZADA">FINALIZADA</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="label">Observações</label>
                                    <textarea
                                        placeholder="Observações sobre a adoção"
                                        value={inputObservacoes}
                                        onChange={(e) => setInputObservacoes(e.target.value)}
                                        className="textarea"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                {adocaoSelecionada ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={salvarAdocao}
                                            disabled={loading}
                                            className="btn btn-primary"
                                        >
                                            {loading ? 'Salvando...' : 'Salvar Alterações'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={limparForm}
                                            disabled={loading}
                                            className="btn btn-outline"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={cadastrarAdocao}
                                        disabled={loading}
                                        className="btn btn-primary"
                                    >
                                        {loading ? 'Cadastrando...' : 'Cadastrar Adoção'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Lista de Adoções */}
                        <div>
                            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-6">
                                Adoções Cadastradas
                            </h2>

                            {loading && adocoes.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                                    <p className="mt-4 text-neutral-600 dark:text-neutral-400">Carregando...</p>
                                </div>
                            ) : adocoes.length === 0 ? (
                                <div className="card text-center py-12">
                                    <p className="text-neutral-600 dark:text-neutral-400">
                                        Nenhuma adoção cadastrada ainda
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {adocoes.map((adocao) => (
                                        <div key={adocao.id} className="card card-hover">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                                    Adoção #{adocao.id}
                                                </h3>
                                                <span className={`badge ${getStatusBadge(adocao.status)}`}>
                                                    {adocao.status}
                                                </span>
                                            </div>

                                            <div className="space-y-2 mb-4 text-sm">
                                                <p className="text-neutral-600 dark:text-neutral-400">
                                                    <strong>Praça:</strong> {adocao.praca?.nome || `ID: ${adocao.pracaId}`}
                                                </p>
                                                <p className="text-neutral-600 dark:text-neutral-400">
                                                    <strong>Empresa:</strong> {adocao.empresa?.nomeFantasia || adocao.empresa?.razaoSocial || `ID: ${adocao.empresaId}`}
                                                </p>
                                                <p className="text-neutral-600 dark:text-neutral-400">
                                                    <strong>Início:</strong> {new Date(adocao.dataInicio).toLocaleDateString('pt-BR')}
                                                </p>
                                                {adocao.dataFim && (
                                                    <p className="text-neutral-600 dark:text-neutral-400">
                                                        <strong>Fim:</strong> {new Date(adocao.dataFim).toLocaleDateString('pt-BR')}
                                                    </p>
                                                )}
                                                {adocao.observacoes && (
                                                    <p className="text-neutral-600 dark:text-neutral-400">
                                                        <strong>Obs:</strong> {adocao.observacoes}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                                                <button
                                                    onClick={() => buscarAdocaoPorId(adocao.id)}
                                                    className="btn btn-ghost text-sm flex-1"
                                                >
                                                    Editar
                                                </button>

                                                {adocao.status === 'PENDENTE' && (
                                                    <>
                                                        <button
                                                            onClick={() => aprovarAdocao(adocao.id)}
                                                            className="btn btn-success text-sm flex-1"
                                                        >
                                                            Aprovar
                                                        </button>
                                                        <button
                                                            onClick={() => rejeitarAdocao(adocao.id)}
                                                            className="btn btn-error text-sm flex-1"
                                                        >
                                                            Rejeitar
                                                        </button>
                                                    </>
                                                )}

                                                <button
                                                    onClick={() => deletarAdocao(adocao.id)}
                                                    className="btn btn-error text-sm flex-1"
                                                >
                                                    Deletar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        export default CadastroAdocoes;