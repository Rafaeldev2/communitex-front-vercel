import React from "react";
import {useEffect, useState} from "react";
import "./PracaSTYLE.css";
import pracaService from "../../services/pracaService/pracaService";

function CadastroPraca() {
    const [pracas, setPracas] = useState([]);
    const [pracaSelecionada, setPracaSelecionada] = useState(null);

    const [inputNome, setInputNome] = useState('')
    const [inputLogradouro, setInputLogradouro] = useState('')
    const [inputBairro, setInputBairro] = useState('')
    const [inputCidade, setInputCidade] = useState('')
    const [inputLatitude, setInputLatitude] = useState('')
    const [inputLongitude, setInputLongitude] = useState('')
    const [inputDescricao, setInputDescricao] = useState('')
    const [inputFotoUrl, setInputFotoUrl] = useState('')
    const [inputStatus, setInputStatus] = useState('')



    const fetchPracas = async () => {
        try {
            const data = await pracaService.getAll();
            setPracas(data);
        } catch (error) {
            console.error('Erro ao buscar praças:', error);
        }
    };

    useEffect(() => {
        fetchPracas();
    }, []);

    useEffect(() => {
        console.log(pracas);
    }, [pracas]);

    const cadastrarPraca = async () => {
        try {
            const praca = {
                nome: inputNome,
                logradouro: inputLogradouro,
                bairro: inputBairro,
                cidade: inputCidade,
                latitude: inputLatitude,
                longitude: inputLongitude,
                descricao: inputDescricao,
                fotoUrl: inputFotoUrl,
                status: inputStatus
            };
            await pracaService.create(praca);
            await fetchPracas();
            limparForm();
        } catch (error) {
            console.error('Erro ao adicionar praca:', error);
        }
    };

    const salvarPraca = async () => {
        try {
            const praca = {
                nome: inputNome,
                logradouro: inputLogradouro,
                bairro: inputBairro,
                cidade: inputCidade,
                latitude: inputLatitude,
                longitude: inputLongitude,
                descricao: inputDescricao,
                fotoUrl: inputFotoUrl,
                status: inputStatus
            };
            await pracaService.update(pracaSelecionada.id, praca);
            await fetchPracas();
            setPracaSelecionada(null);
            limparForm();
        } catch (error) {
            console.error('Erro ao atualizar praca:', error);
        }
    };

    const buscarPracaPorId = async (id) => {
        try {
            const praca = await pracaService.getById(id);
            setPracaSelecionada(praca);
            exibirPraca(praca);
        } catch (error) {
            console.error('Erro ao buscar praça por ID:', error);
        }
    };

    const deletarPraca = async (id) => {
        try {
            await pracaService.delete(id); // ✅ CORRETO
            await fetchPracas();
        } catch (error) {
            console.error('Erro ao deletar praca:', error);
        }
    };

    function limparForm() {
        setInputNome('')
        setInputLogradouro('')
        setInputBairro('')
        setInputCidade('')
        setInputLatitude('')
        setInputLongitude('')
        setInputDescricao('')
        setInputFotoUrl('')
        setInputStatus('')
    }

    function exibirPraca(praca) {
        setInputNome(praca.nome || '')
        setInputLogradouro(praca.logradouro || '')
        setInputBairro(praca.bairro || '')
        setInputCidade(praca.cidade || '')
        setInputLatitude(praca.latitude || '')
        setInputLongitude(praca.longitude || '')
        setInputDescricao(praca.descricao || '')
        setInputFotoUrl(praca.fotoUrl || '')
        setInputStatus(praca.status || '')
    }

    return (
        <div className='app-container'>
            <h1 className={"text-base md:text-lg lg:text-xl"}>CRUD de Praças</h1>

            <div className='form'>
                <div className="input-container">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        placeholder=" Ex: Praça da Alfândega"
                        value={inputNome}
                        onChange={(event) => setInputNome(event.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="">Logradouro</label>
                    <input
                        type="text"
                        placeholder=" Ex: Rua Tal"
                        value={inputLogradouro}
                        onChange={(event) => setInputLogradouro(event.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="">Bairro</label>
                    <input
                        type="text"
                        placeholder=" Ex: Capoeiras"
                        value={inputBairro}
                        onChange={(event) => setInputBairro(event.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="">Cidade</label>
                    <input
                        type="text"
                        placeholder=" Ex: São Carlos"
                        value={inputCidade}
                        onChange={(event) => setInputCidade(event.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="">Latitude</label>
                    <input
                        type="text"
                        placeholder=" Ex: 22,9°S"
                        value={inputLatitude}
                        onChange={(event) => setInputLatitude(event.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="">Longitude</label>
                    <input
                        type="text"
                        placeholder=" Ex: 43,2°W"
                        value={inputLongitude}
                        onChange={(event) => setInputLongitude(event.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="">Descrição</label>
                    <textarea
                        placeholder=" Ex: São Carlos"
                        value={inputDescricao}
                        onChange={(event) => setInputDescricao(event.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="">Foto Url</label>
                    <input
                        type="file"
                        placeholder=" Insira uma URL ou carregue uma foto"
                        value={inputFotoUrl}
                        onChange={(event) => setInputFotoUrl(event.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="">Status</label>
                    <select value={inputStatus}
                            onChange={(event) => setInputStatus(event.target.value)}>
                        <option value="">Selecione uma opção</option>
                        <option value="disponivel">DISPONIVEL</option>
                        <option value="emProcesso">EM_PROCESSO</option>
                        <option value="adotada">ADOTADA</option>
                    </select>
                </div>
                {pracaSelecionada && <button type="button" onClick={salvarPraca}>Salvar Alterações</button>}
                {!pracaSelecionada && <button type="button" onClick={cadastrarPraca}>Cadastrar Praça</button>}
            </div>


            <section className="pracas">
                {console.log(pracas)}
                {pracas.map((praca) => (
                    <div key={praca.id} className="praca">
                        <h2>{praca.nome}</h2>
                        <p>{praca.logradouro}</p>
                        <p>{praca.bairro}</p>
                        <p>{praca.cidade}</p>
                        <p>{praca.latitude}</p>
                        <p>{praca.longitude}</p>
                        <p>{praca.descricao}</p>
                        <p>{praca.fotoUrl}</p>
                        <p>{praca.status}</p>
                        <button onClick={() => buscarPracaPorId(praca.id)}>Editar</button>
                        <button onClick={() => deletarPraca(praca.id)}>Deletar</button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default CadastroPraca;