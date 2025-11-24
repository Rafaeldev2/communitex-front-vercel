import React, { useEffect, useState } from "react";
import pracaService from "../../services/pracaService/pracaService";
import { useToast } from "../../hooks/useToast";

function CadastroPraca() {
    const { showSuccess, showError, showWarning, showPromise } = useToast();

    const [pracas, setPracas] = useState([]);
    const [pracaSelecionada, setPracaSelecionada] = useState(null);
    const [loading, setLoading] = useState(false);

    const [inputNome, setInputNome] = useState('');
    const [inputLogradouro, setInputLogradouro] = useState('');
    const [inputBairro, setInputBairro] = useState('');
    const [inputCidade, setInputCidade] = useState('');
    const [inputLatitude, setInputLatitude] = useState('');
    const [inputLongitude, setInputLongitude] = useState('');
    const [inputDescricao, setInputDescricao] = useState('');
    const [inputFotoUrl, setInputFotoUrl] = useState('');
    const [inputStatus, setInputStatus] = useState('DISPONIVEL');

    const fetchPracas = async () => {
        try {
            setLoading(true);
            const data = await pracaService.getAll();
            setPracas(Array.isArray(data) ? data : []);
            showSuccess('Praças carregadas com sucesso!');
        } catch (error) {
            console.error('Erro ao buscar praças:', error);
            showError('Erro ao carregar praças');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPracas();
    }, []);

    const cadastrarPraca = async () => {
        if (!inputNome || !inputCidade) {
            showWarning('Preencha todos os campos obrigatórios');
            return;
        }

        const praca = {
            nome: inputNome,
            logradouro: inputLogradouro,
            bairro: inputBairro,
            cidade: inputCidade,
            latitude: inputLatitude ? parseFloat(inputLatitude) : null,
            longitude: inputLongitude ? parseFloat(inputLongitude) : null,
            descricao: inputDescricao,
            fotoUrl: inputFotoUrl,
            status: inputStatus
        };

        await showPromise(
            pracaService.create(praca),
            {
                pending: 'Cadastrando praça...',
                success: 'Praça cadastrada com sucesso!',
                error: 'Erro ao cadastrar praça'
            }
        );

        await fetchPracas();
        limparForm();
    };

    const salvarPraca = async () => {
        if (!inputNome || !inputCidade) {
            showWarning('Preencha todos os campos obrigatórios');
            return;
        }

        const praca = {
            nome: inputNome,
            logradouro: inputLogradouro,
            bairro: inputBairro,
            cidade: inputCidade,
            latitude: inputLatitude ? parseFloat(inputLatitude) : null,
            longitude: inputLongitude ? parseFloat(inputLongitude) : null,
            descricao: inputDescricao,
            fotoUrl: inputFotoUrl,
            status: inputStatus
        };

        await showPromise(
            pracaService.update(pracaSelecionada.id, praca),
            {
                pending: 'Atualizando praça...',
                success: 'Praça atualizada com sucesso!',
                error: 'Erro ao atualizar praça'
            }
        );

        await fetchPracas();
        setPracaSelecionada(null);
        limparForm();
    };

    const buscarPracaPorId = async (id) => {
        try {
            const praca = await pracaService.getById(id);
            setPracaSelecionada(praca);
            exibirPraca(praca);
            showInfo('Praça carregada para edição');
        } catch (error) {
            console.error('Erro ao buscar praça:', error);
            showError('Erro ao carregar praça');
        }
    };

    const deletarPraca = async (id) => {
        if (!window.confirm('Tem certeza que deseja deletar esta praça?')) return;

        await showPromise(
            pracaService.delete(id),
            {
                pending: 'Deletando praça...',
                success: 'Praça deletada com sucesso!',
                error: 'Erro ao deletar praça'
            }
        );

        await fetchPracas();
    };

    function limparForm() {
        setInputNome('');
        setInputLogradouro('');
        setInputBairro('');
        setInputCidade('');
        setInputLatitude('');
        setInputLongitude('');
        setInputDescricao('');
        setInputFotoUrl('');
        setInputStatus('DISPONIVEL');
    }

    function exibirPraca(praca) {
        setInputNome(praca.nome || '');
        setInputLogradouro(praca.logradouro || '');
        setInputBairro(praca.bairro || '');
        setInputCidade(praca.cidade || '');
        setInputLatitude(praca.latitude || '');
        setInputLongitude(praca.longitude || '');
        setInputDescricao(praca.descricao || '');
        setInputFotoUrl(praca.fotoUrl || '');
        setInputStatus(praca.status || 'DISPONIVEL');
    }

    const getStatusBadge = (status) => {
        const badges = {
            DISPONIVEL: 'badge-success',
            EM_PROCESSO: 'badge-warning',
            ADOTADA: 'badge-info'
        };
        return badges[status] || 'badge-primary';
    };

    return (
        <div className="min-h-screen">

            <div className="mb-8">
                <h1 className="text-3xl font-sans font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    Gestão de Praças
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                    Cadastre e gerencie as praças disponíveis para adoção
                </p>
            </div>

            <div className="card mb-8">
                <h2 className="text-xl font-sans font-semibold mb-6 text-neutral-900 dark:text-neutral-50">
                    {pracaSelecionada ? 'Editar Praça' : 'Nova Praça'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="label" htmlFor="nome">Nome *</label>
                        <input
                            id="nome"
                            type="text"
                            className="input"
                            placeholder="Ex: Praça da República"
                            value={inputNome}
                            onChange={(e) => setInputNome(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="logradouro">Logradouro</label>
                        <input
                            id="logradouro"
                            type="text"
                            className="input"
                            placeholder="Ex: Rua das Flores"
                            value={inputLogradouro}
                            onChange={(e) => setInputLogradouro(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="bairro">Bairro</label>
                        <input
                            id="bairro"
                            type="text"
                            className="input"
                            placeholder="Ex: Centro"
                            value={inputBairro}
                            onChange={(e) => setInputBairro(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="cidade">Cidade *</label>
                        <input
                            id="cidade"
                            type="text"
                            className="input"
                            placeholder="Ex: São Paulo"
                            value={inputCidade}
                            onChange={(e) => setInputCidade(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="latitude">Latitude</label>
                        <input
                            id="latitude"
                            type="number"
                            step="any"
                            className="input"
                            placeholder="Ex: -23.550520"
                            value={inputLatitude}
                            onChange={(e) => setInputLatitude(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="longitude">Longitude</label>
                        <input
                            id="longitude"
                            type="number"
                            step="any"
                            className="input"
                            placeholder="Ex: -46.633308"
                            value={inputLongitude}
                            onChange={(e) => setInputLongitude(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="status">Status</label>
                        <select
                            id="status"
                            className="select"
                            value={inputStatus}
                            onChange={(e) => setInputStatus(e.target.value)}
                        >
                            <option value="DISPONIVEL">Disponível</option>
                            <option value="EM_PROCESSO">Em Processo</option>
                            <option value="ADOTADA">Adotada</option>
                        </select>
                    </div>

                    <div>
                        <label className="label" htmlFor="fotoUrl">URL da Foto</label>
                        <input
                            id="fotoUrl"
                            type="url"
                            className="input"
                            placeholder="https://exemplo.com/foto.jpg"
                            value={inputFotoUrl}
                            onChange={(e) => setInputFotoUrl(e.target.value)}
                        />
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                        <label className="label" htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            className="textarea"
                            placeholder="Descreva as características da praça..."
                            value={inputDescricao}
                            onChange={(e) => setInputDescricao(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    {pracaSelecionada ? (
                        <>
                            <button onClick={salvarPraca} className="btn btn-primary">
                                Salvar Alterações
                            </button>
                            <button
                                onClick={() => {
                                    setPracaSelecionada(null);
                                    limparForm();
                                }}
                                className="btn btn-outline"
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button onClick={cadastrarPraca} className="btn btn-primary">
                            Cadastrar Praça
                        </button>
                    )}
                </div>
            </div>

            {/* Lista de Praças */}
            <div>
                <h2 className="text-xl font-sans font-semibold mb-6 text-neutral-900 dark:text-neutral-50">
                    Praças Cadastradas ({pracas.length})
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : pracas.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-neutral-500 dark:text-neutral-400">
                            Nenhuma praça cadastrada ainda
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pracas.map((praca) => (
                            <div key={praca.id} className="card card-hover">
                                {praca.fotoUrl && (
                                    <img
                                        src={praca.fotoUrl}
                                        alt={praca.nome}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}

                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                        {praca.nome}
                                    </h3>
                                    <span className={`badge ${getStatusBadge(praca.status)}`}>
                                        {praca.status.replace('_', ' ')}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                    {praca.logradouro && (
                                        <p>📍 {praca.logradouro}</p>
                                    )}
                                    {praca.bairro && (
                                        <p>🏘️ {praca.bairro}</p>
                                    )}
                                    <p>🏙️ {praca.cidade}</p>
                                    {praca.descricao && (
                                        <p className="line-clamp-2">{praca.descricao}</p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => buscarPracaPorId(praca.id)}
                                        className="btn btn-secondary flex-1"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletarPraca(praca.id)}
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

export default CadastroPraca;