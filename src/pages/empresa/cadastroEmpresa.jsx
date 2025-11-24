import React, { useEffect, useState } from "react";
                            import empresaService from "../../services/empresaService/empresaService";
                            import representanteService from "../../services/representanteService/representanteService";
                            import { useToast } from "../../hooks/useToast";

                            function CadastroEmpresas() {
                                const { showSuccess, showError, showWarning, showPromise, showInfo } = useToast();

                                const [empresas, setEmpresas] = useState([]);
                                const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
                                const [representantes, setRepresentantes] = useState([]);
                                const [loading, setLoading] = useState(false);

                                const [inputRazaoSocial, setInputRazaoSocial] = useState('');
                                const [inputNomeFantasia, setInputNomeFantasia] = useState('');
                                const [inputCnpj, setInputCnpj] = useState('');
                                const [inputTelefone, setInputTelefone] = useState('');
                                const [inputEmail, setInputEmail] = useState('');
                                const [inputEnderecoCompleto, setInputEnderecoCompleto] = useState('');
                                const [inputSetor, setInputSetor] = useState('');
                                const [inputRepresentanteId, setInputRepresentanteId] = useState('');

                                const fetchEmpresas = async () => {
                                    try {
                                        setLoading(true);
                                        const data = await empresaService.getAll();
                                        setEmpresas(Array.isArray(data) ? data : []);
                                    } catch (error) {
                                        console.error('Erro ao buscar empresas:', error);
                                        showError('Erro ao carregar empresas');
                                    } finally {
                                        setLoading(false);
                                    }
                                };

                                const fetchRepresentantes = async () => {
                                    try {
                                        const data = await representanteService.getAll();
                                        setRepresentantes(Array.isArray(data) ? data : []);
                                    } catch (error) {
                                        console.error('Erro ao buscar representantes:', error);
                                    }
                                };

                                useEffect(() => {
                                    fetchEmpresas();
                                    fetchRepresentantes();
                                }, []);

                                const cadastrarEmpresa = async () => {
                                    if (!inputRazaoSocial || !inputCnpj) {
                                        showWarning('Preencha a Razão Social e o CNPJ');
                                        return;
                                    }

                                    const empresa = {
                                        razaoSocial: inputRazaoSocial,
                                        nomeFantasia: inputNomeFantasia,
                                        cnpj: inputCnpj,
                                        telefone: inputTelefone,
                                        email: inputEmail,
                                        enderecoCompleto: inputEnderecoCompleto,
                                        setor: inputSetor,
                                        representanteId: inputRepresentanteId ? parseInt(inputRepresentanteId) : null
                                    };

                                    await showPromise(
                                        empresaService.create(empresa),
                                        {
                                            pending: 'Cadastrando empresa...',
                                            success: 'Empresa cadastrada com sucesso!',
                                            error: 'Erro ao cadastrar empresa'
                                        }
                                    );

                                    await fetchEmpresas();
                                    limparForm();
                                };

                                const salvarEmpresa = async () => {
                                    if (!inputRazaoSocial || !inputCnpj) {
                                        showWarning('Preencha a Razão Social e o CNPJ');
                                        return;
                                    }

                                    const empresa = {
                                        razaoSocial: inputRazaoSocial,
                                        nomeFantasia: inputNomeFantasia,
                                        cnpj: inputCnpj,
                                        telefone: inputTelefone,
                                        email: inputEmail,
                                        enderecoCompleto: inputEnderecoCompleto,
                                        setor: inputSetor,
                                        representanteId: inputRepresentanteId ? parseInt(inputRepresentanteId) : null
                                    };

                                    await showPromise(
                                        empresaService.update(empresaSelecionada.id, empresa),
                                        {
                                            pending: 'Atualizando empresa...',
                                            success: 'Empresa atualizada com sucesso!',
                                            error: 'Erro ao atualizar empresa'
                                        }
                                    );

                                    await fetchEmpresas();
                                    setEmpresaSelecionada(null);
                                    limparForm();
                                };

                                const buscarEmpresaPorId = async (id) => {
                                    try {
                                        const empresa = await empresaService.getById(id);
                                        setEmpresaSelecionada(empresa);
                                        exibirEmpresa(empresa);
                                        showInfo('Empresa carregada para edição');
                                    } catch (error) {
                                        console.error('Erro ao buscar empresa:', error);
                                        showError('Erro ao carregar empresa');
                                    }
                                };

                                const deletarEmpresa = async (id) => {
                                    if (!window.confirm('Tem certeza que deseja deletar esta empresa?')) return;

                                    await showPromise(
                                        empresaService.delete(id),
                                        {
                                            pending: 'Deletando empresa...',
                                            success: 'Empresa deletada com sucesso!',
                                            error: 'Erro ao deletar empresa'
                                        }
                                    );

                                    await fetchEmpresas();
                                };

                                function limparForm() {
                                    setInputRazaoSocial('');
                                    setInputNomeFantasia('');
                                    setInputCnpj('');
                                    setInputTelefone('');
                                    setInputEmail('');
                                    setInputEnderecoCompleto('');
                                    setInputSetor('');
                                    setInputRepresentanteId('');
                                }

                                function exibirEmpresa(empresa) {
                                    setInputRazaoSocial(empresa.razaoSocial || '');
                                    setInputNomeFantasia(empresa.nomeFantasia || '');
                                    setInputCnpj(empresa.cnpj || '');
                                    setInputTelefone(empresa.telefone || '');
                                    setInputEmail(empresa.email || '');
                                    setInputEnderecoCompleto(empresa.enderecoCompleto || '');
                                    setInputSetor(empresa.setor || '');
                                    setInputRepresentanteId(empresa.representante?.id || '');
                                }

                                return (
                                    <div className="min-h-screen">
                                        <div className="mb-8">
                                            <h1 className="text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                                                Gestão de Empresas
                                            </h1>
                                            <p className="text-neutral-600 dark:text-neutral-400">
                                                Cadastre e gerencie as empresas parceiras
                                            </p>
                                        </div>

                                        <div className="card mb-8">
                                            <h2 className="text-xl font-sans font-semibold mb-6 text-neutral-900 dark:text-neutral-50">
                                                {empresaSelecionada ? 'Editar Empresa' : 'Nova Empresa'}
                                            </h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="label">Razão Social *</label>
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="Ex: Empresa XYZ Ltda"
                                                        value={inputRazaoSocial}
                                                        onChange={(e) => setInputRazaoSocial(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">Nome Fantasia</label>
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="Ex: XYZ Comércio"
                                                        value={inputNomeFantasia}
                                                        onChange={(e) => setInputNomeFantasia(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">CNPJ *</label>
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="00.000.000/0000-00"
                                                        value={inputCnpj}
                                                        onChange={(e) => setInputCnpj(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">Telefone</label>
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="(00) 00000-0000"
                                                        value={inputTelefone}
                                                        onChange={(e) => setInputTelefone(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">Email</label>
                                                    <input
                                                        type="email"
                                                        className="input"
                                                        placeholder="contato@empresa.com"
                                                        value={inputEmail}
                                                        onChange={(e) => setInputEmail(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label">Setor</label>
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="Ex: Tecnologia"
                                                        value={inputSetor}
                                                        onChange={(e) => setInputSetor(e.target.value)}
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="label">Endereço Completo</label>
                                                    <input
                                                        type="text"
                                                        className="input"
                                                        placeholder="Rua ABC, 123 - Centro"
                                                        value={inputEnderecoCompleto}
                                                        onChange={(e) => setInputEnderecoCompleto(e.target.value)}
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="label">Representante</label>
                                                    <select
                                                        className="select"
                                                        value={inputRepresentanteId}
                                                        onChange={(e) => setInputRepresentanteId(e.target.value)}
                                                    >
                                                        <option value="">Selecione um representante</option>
                                                        {representantes.map((rep) => (
                                                            <option key={rep.id} value={rep.id}>
                                                                {rep.nome} - {rep.cpf}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mt-6">
                                                {empresaSelecionada ? (
                                                    <>
                                                        <button onClick={salvarEmpresa} className="btn btn-primary">
                                                            Salvar Alterações
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEmpresaSelecionada(null);
                                                                limparForm();
                                                            }}
                                                            className="btn btn-outline"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button onClick={cadastrarEmpresa} className="btn btn-primary">
                                                        Cadastrar Empresa
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-sans font-semibold mb-6 text-neutral-900 dark:text-neutral-50">
                                                Empresas Cadastradas ({empresas.length})
                                            </h2>

                                            {loading ? (
                                                <div className="flex justify-center py-12">
                                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                                                </div>
                                            ) : empresas.length === 0 ? (
                                                <div className="card text-center py-12">
                                                    <p className="text-neutral-500 dark:text-neutral-400">
                                                        Nenhuma empresa cadastrada ainda
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {empresas.map((empresa) => (
                                                        <div key={empresa.id} className="card card-hover">
                                                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                                                                {empresa.nomeFantasia || empresa.razaoSocial}
                                                            </h3>

                                                            <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                                                <p><strong>Razão Social:</strong> {empresa.razaoSocial}</p>
                                                                <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
                                                                {empresa.telefone && <p><strong>Telefone:</strong> {empresa.telefone}</p>}
                                                                {empresa.email && <p><strong>Email:</strong> {empresa.email}</p>}
                                                                {empresa.setor && <p><strong>Setor:</strong> {empresa.setor}</p>}
                                                                {empresa.representante && (
                                                                    <p><strong>Representante:</strong> {empresa.representante.nome}</p>
                                                                )}
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => buscarEmpresaPorId(empresa.id)}
                                                                    className="btn btn-secondary flex-1"
                                                                >
                                                                    Editar
                                                                </button>
                                                                <button
                                                                    onClick={() => deletarEmpresa(empresa.id)}
                                                                    className="btn btn-error flex-1"
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
                                );
                            }

                            export default CadastroEmpresas;