import React, { useEffect, useState } from "react";
import representanteService from "../../services/representanteService/representanteService";
import { useToast } from "../../hooks/useToast";

function CadastroRepresentantes() {
    const { showSuccess, showError, showWarning, showPromise, showInfo } = useToast();

    const [representantes, setRepresentantes] = useState([]);
    const [representanteSelecionado, setRepresentanteSelecionado] = useState(null);
    const [loading, setLoading] = useState(false);

    const [inputNome, setInputNome] = useState('');
    const [inputCpf, setInputCpf] = useState('');
    const [inputTelefone, setInputTelefone] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputCargo, setInputCargo] = useState('');

    const fetchRepresentantes = async () => {
        try {
            setLoading(true);
            const data = await representanteService.getAll();
            setRepresentantes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Erro ao buscar representantes:', error);
            showError('Erro ao carregar representantes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepresentantes();
    }, []);

    const cadastrarRepresentante = async () => {
        if (!inputNome || !inputCpf) {
            showWarning('Preencha o Nome e o CPF');
            return;
        }

        const representante = {
            nome: inputNome,
            cpf: inputCpf,
            telefone: inputTelefone,
            email: inputEmail,
            cargo: inputCargo
        };

        await showPromise(
            representanteService.create(representante),
            {
                pending: 'Cadastrando representante...',
                success: 'Representante cadastrado com sucesso!',
                error: 'Erro ao cadastrar representante'
            }
        );

        await fetchRepresentantes();
        limparForm();
    };

    const salvarRepresentante = async () => {
        if (!inputNome || !inputCpf) {
            showWarning('Preencha o Nome e o CPF');
            return;
        }

        const representante = {
            nome: inputNome,
            cpf: inputCpf,
            telefone: inputTelefone,
            email: inputEmail,
            cargo: inputCargo
        };

        await showPromise(
            representanteService.update(representanteSelecionado.id, representante),
            {
                pending: 'Atualizando representante...',
                success: 'Representante atualizado com sucesso!',
                error: 'Erro ao atualizar representante'
            }
        );

        await fetchRepresentantes();
        setRepresentanteSelecionado(null);
        limparForm();
    };

    const buscarRepresentantePorId = async (id) => {
        try {
            const representante = await representanteService.getById(id);
            setRepresentanteSelecionado(representante);
            exibirRepresentante(representante);
            showInfo('Representante carregado para edição');
        } catch (error) {
            console.error('Erro ao buscar representante:', error);
            showError('Erro ao carregar representante');
        }
    };

    const deletarRepresentante = async (id) => {
        if (!window.confirm('Tem certeza que deseja deletar este representante?')) return;

        await showPromise(
            representanteService.delete(id),
            {
                pending: 'Deletando representante...',
                success: 'Representante deletado com sucesso!',
                error: 'Erro ao deletar representante'
            }
        );

        await fetchRepresentantes();
    };

    function limparForm() {
        setInputNome('');
        setInputCpf('');
        setInputTelefone('');
        setInputEmail('');
        setInputCargo('');
    }

    function exibirRepresentante(representante) {
        setInputNome(representante.nome || '');
        setInputCpf(representante.cpf || '');
        setInputTelefone(representante.telefone || '');
        setInputEmail(representante.email || '');
        setInputCargo(representante.cargo || '');
    }

    return (
        <div className="min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    Gestão de Representantes
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Cadastre e gerencie os representantes das empresas
                </p>
            </div>

            <div className="card mb-8">
                <h2 className="text-xl font-sans font-semibold mb-6 text-neutral-900 dark:text-neutral-50">
                    {representanteSelecionado ? 'Editar Representante' : 'Novo Representante'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label">Nome Completo *</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Ex: João da Silva"
                            value={inputNome}
                            onChange={(e) => setInputNome(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">CPF *</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="000.000.000-00"
                            value={inputCpf}
                            onChange={(e) => setInputCpf(e.target.value)}
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
                            placeholder="representante@email.com"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="label">Cargo</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Ex: Diretor de Operações"
                            value={inputCargo}
                            onChange={(e) => setInputCargo(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    {representanteSelecionado ? (
                        <>
                            <button onClick={salvarRepresentante} className="btn btn-primary">
                                Salvar Alterações
                            </button>
                            <button
                                onClick={() => {
                                    setRepresentanteSelecionado(null);
                                    limparForm();
                                }}
                                className="btn btn-outline"
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button onClick={cadastrarRepresentante} className="btn btn-primary">
                            Cadastrar Representante
                        </button>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-sans font-semibold mb-6 text-neutral-900 dark:text-neutral-50">
                    Representantes Cadastrados ({representantes.length})
                </h2>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : representantes.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-neutral-500 dark:text-neutral-400">
                            Nenhum representante cadastrado ainda
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {representantes.map((rep) => (
                            <div key={rep.id} className="card card-hover">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                        <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                                            {rep.nome.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                            {rep.nome}
                                        </h3>
                                        {rep.cargo && (
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                {rep.cargo}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                    <p><strong>CPF:</strong> {rep.cpf}</p>
                                    {rep.telefone && <p><strong>Telefone:</strong> {rep.telefone}</p>}
                                    {rep.email && <p><strong>Email:</strong> {rep.email}</p>}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => buscarRepresentantePorId(rep.id)}
                                        className="btn btn-secondary flex-1"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletarRepresentante(rep.id)}
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

export default CadastroRepresentantes;