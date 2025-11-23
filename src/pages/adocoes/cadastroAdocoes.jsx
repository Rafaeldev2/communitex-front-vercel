import React, { useEffect, useState } from "react";
import adocaoService from "../../services/adocaoService/adocaoService";
import pracaService from "../../services/pracaService/pracaService";
import empresaService from "../../services/empresaService/empresaService";

function CadastroAdocoes() {
    const [adocoes, setAdocoes] = useState([]);
    const [adocaoSelecionada, setAdocaoSelecionada] = useState(null);
    const [pracas, setPracas] = useState([]);
    const [empresas, setEmpresas] = useState([]);

    const [inputPracaId, setInputPracaId] = useState('');
    const [inputEmpresaId, setInputEmpresaId] = useState('');
    const [inputDataInicio, setInputDataInicio] = useState('');
    const [inputDataFim, setInputDataFim] = useState('');
    const [inputStatus, setInputStatus] = useState('PENDENTE');
    const [inputObservacoes, setInputObservacoes] = useState('');

    const fetchAdocoes = async () => {
        try {
            const data = await adocaoService.getAll();
            setAdocoes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Erro ao buscar adoções:', error);
        }
    };

    const fetchPracas = async () => {
        try {
            const data = await pracaService.getAll();
            setPracas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Erro ao buscar praças:', error);
        }
    };

    const fetchEmpresas = async () => {
        try {
            const data = await empresaService.getAll();
            setEmpresas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Erro ao buscar empresas:', error);
        }
    };

    useEffect(() => {
        fetchAdocoes();
        fetchPracas();
        fetchEmpresas();
    }, []);

    const cadastrarAdocao = async () => {
        try {
            const adocao = {
                pracaId: parseInt(inputPracaId),
                empresaId: parseInt(inputEmpresaId),
                dataInicio: inputDataInicio,
                dataFim: inputDataFim || null,
                status: inputStatus,
                observacoes: inputObservacoes
            };
            await adocaoService.create(adocao);
            await fetchAdocoes();
            limparForm();
        } catch (error) {
            console.error('Erro ao adicionar adoção:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            }
        }
    };

    const salvarAdocao = async () => {
        try {
            const adocao = {
                pracaId: parseInt(inputPracaId),
                empresaId: parseInt(inputEmpresaId),
                dataInicio: inputDataInicio,
                dataFim: inputDataFim || null,
                status: inputStatus,
                observacoes: inputObservacoes
            };
            await adocaoService.update(adocaoSelecionada.id, adocao);
            await fetchAdocoes();
            setAdocaoSelecionada(null);
            limparForm();
        } catch (error) {
            console.error('Erro ao atualizar adoção:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            }
        }
    };

    const buscarAdocaoPorId = async (id) => {
        try {
            const adocao = await adocaoService.getById(id);
            setAdocaoSelecionada(adocao);
            exibirAdocao(adocao);
        } catch (error) {
            console.error('Erro ao buscar adoção por ID:', error);
        }
    };

    const deletarAdocao = async (id) => {
        try {
            await adocaoService.delete(id);
            await fetchAdocoes();
        } catch (error) {
            console.error('Erro ao deletar adoção:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            }
        }
    };

    const aprovarAdocao = async (id) => {
        try {
            await adocaoService.aprovar(id);
            await fetchAdocoes();
        } catch (error) {
            console.error('Erro ao aprovar adoção:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            }
        }
    };

    const rejeitarAdocao = async (id) => {
        try {
            await adocaoService.rejeitar(id);
            await fetchAdocoes();
        } catch (error) {
            console.error('Erro ao rejeitar adoção:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            }
        }
    };

    function limparForm() {
        setInputPracaId('');
        setInputEmpresaId('');
        setInputDataInicio('');
        setInputDataFim('');
        setInputStatus('PENDENTE');
        setInputObservacoes('');
    }

    function exibirAdocao(adocao) {
        setInputPracaId(adocao.praca?.id || adocao.pracaId || '');
        setInputEmpresaId(adocao.empresa?.id || adocao.empresaId || '');
        setInputDataInicio(adocao.dataInicio || '');
        setInputDataFim(adocao.dataFim || '');
        setInputStatus(adocao.status || 'PENDENTE');
        setInputObservacoes(adocao.observacoes || '');
    }

    return (
        <div className='app-container'>
            <h1 className={"text-base md:text-lg lg:text-xl"}>CRUD de Adoções</h1>

            <div className='form'>
                <div className="input-container">
                    <label htmlFor="pracaId">Praça</label>
                    <select
                        value={inputPracaId}
                        onChange={(e) => setInputPracaId(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma praça</option>
                        {pracas.map((praca) => (
                            <option key={praca.id} value={praca.id}>
                                {praca.nome} - {praca.bairro}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="empresaId">Empresa</label>
                    <select
                        value={inputEmpresaId}
                        onChange={(e) => setInputEmpresaId(e.target.value)}
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
                <div className="input-container">
                    <label htmlFor="dataInicio">Data de Início</label>
                    <input
                        type="date"
                        value={inputDataInicio}
                        onChange={(e) => setInputDataInicio(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="dataFim">Data de Fim</label>
                    <input
                        type="date"
                        value={inputDataFim}
                        onChange={(e) => setInputDataFim(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="status">Status</label>
                    <select value={inputStatus} onChange={(e) => setInputStatus(e.target.value)}>
                        <option value="PENDENTE">PENDENTE</option>
                        <option value="APROVADA">APROVADA</option>
                        <option value="REJEITADA">REJEITADA</option>
                        <option value="ATIVA">ATIVA</option>
                        <option value="FINALIZADA">FINALIZADA</option>
                    </select>
                </div>
                <div className="input-container">
                    <label htmlFor="observacoes">Observações</label>
                    <textarea
                        placeholder="Observações sobre a adoção"
                        value={inputObservacoes}
                        onChange={(e) => setInputObservacoes(e.target.value)}
                    />
                </div>
                {adocaoSelecionada && <button type="button" onClick={salvarAdocao}>Salvar Alterações</button>}
                {!adocaoSelecionada && <button type="button" onClick={cadastrarAdocao}>Cadastrar Adoção</button>}
            </div>

            <section className="pracas">
                {adocoes.map((adocao) => (
                    <div key={adocao.id} className="praca">
                        <h2>Adoção #{adocao.id}</h2>
                        <p><strong>Praça:</strong> {adocao.praca?.nome || `ID: ${adocao.pracaId}`}</p>
                        <p><strong>Empresa:</strong> {adocao.empresa?.nomeFantasia || adocao.empresa?.razaoSocial || `ID: ${adocao.empresaId}`}</p>
                        <p><strong>Data Início:</strong> {adocao.dataInicio}</p>
                        <p><strong>Data Fim:</strong> {adocao.dataFim || 'Não definida'}</p>
                        <p><strong>Status:</strong> {adocao.status}</p>
                        <p><strong>Observações:</strong> {adocao.observacoes}</p>
                        <button onClick={() => buscarAdocaoPorId(adocao.id)}>Editar</button>
                        <button onClick={() => deletarAdocao(adocao.id)}>Deletar</button>
                        {adocao.status === 'PENDENTE' && (
                            <>
                                <button onClick={() => aprovarAdocao(adocao.id)}>Aprovar</button>
                                <button onClick={() => rejeitarAdocao(adocao.id)}>Rejeitar</button>
                            </>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
}

export default CadastroAdocoes;