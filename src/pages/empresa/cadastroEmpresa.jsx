import React, { useEffect, useState } from "react";
                        import empresaService from "../../services/empresaService/empresaService";
                        import representanteService from "../../services/representanteService/representanteService";

                        function CadastroEmpresas() {
                            const [empresas, setEmpresas] = useState([]);
                            const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
                            const [representantes, setRepresentantes] = useState([]);

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
                                    const data = await empresaService.getAll();
                                    setEmpresas(Array.isArray(data) ? data : []);
                                } catch (error) {
                                    console.error('Erro ao buscar empresas:', error);
                                    if (error.response?.data?.message) {
                                        alert(error.response.data.message);
                                    }
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
                                try {
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
                                    await empresaService.create(empresa);
                                    await fetchEmpresas();
                                    limparForm();
                                } catch (error) {
                                    console.error('Erro ao adicionar empresa:', error);
                                    if (error.response?.data?.message) {
                                        alert(error.response.data.message);
                                    }
                                }
                            };

                            const salvarEmpresa = async () => {
                                try {
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
                                    await empresaService.update(empresaSelecionada.id, empresa);
                                    await fetchEmpresas();
                                    setEmpresaSelecionada(null);
                                    limparForm();
                                } catch (error) {
                                    console.error('Erro ao atualizar empresa:', error);
                                    if (error.response?.data?.message) {
                                        alert(error.response.data.message);
                                    }
                                }
                            };

                            const buscarEmpresaPorId = async (id) => {
                                try {
                                    const empresa = await empresaService.getById(id);
                                    setEmpresaSelecionada(empresa);
                                    exibirEmpresa(empresa);
                                } catch (error) {
                                    console.error('Erro ao buscar empresa por ID:', error);
                                }
                            };

                            const deletarEmpresa = async (id) => {
                                try {
                                    await empresaService.delete(id);
                                    await fetchEmpresas();
                                } catch (error) {
                                    console.error('Erro ao deletar empresa:', error);
                                    if (error.response?.data?.message) {
                                        alert(error.response.data.message);
                                    }
                                }
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
                                <div className='app-container'>
                                    <h1 className={"text-base md:text-lg lg:text-xl"}>CRUD de Empresas</h1>

                                    <div className='form'>
                                        <div className="input-container">
                                            <label htmlFor="razaoSocial">Razão Social</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: Empresa XYZ Ltda"
                                                value={inputRazaoSocial}
                                                onChange={(e) => setInputRazaoSocial(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="nomeFantasia">Nome Fantasia</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: XYZ Comércio"
                                                value={inputNomeFantasia}
                                                onChange={(e) => setInputNomeFantasia(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="cnpj">CNPJ</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: 00.000.000/0000-00"
                                                value={inputCnpj}
                                                onChange={(e) => setInputCnpj(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="telefone">Telefone</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: (00) 0000-0000"
                                                value={inputTelefone}
                                                onChange={(e) => setInputTelefone(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Ex: contato@empresa.com"
                                                value={inputEmail}
                                                onChange={(e) => setInputEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="enderecoCompleto">Endereço Completo</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: Rua ABC, 123 - Centro"
                                                value={inputEnderecoCompleto}
                                                onChange={(e) => setInputEnderecoCompleto(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="setor">Setor</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: Tecnologia"
                                                value={inputSetor}
                                                onChange={(e) => setInputSetor(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="representanteId">Representante</label>
                                            <select
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
                                        {empresaSelecionada && <button type="button" onClick={salvarEmpresa}>Salvar Alterações</button>}
                                        {!empresaSelecionada && <button type="button" onClick={cadastrarEmpresa}>Cadastrar Empresa</button>}
                                    </div>

                                    <section className="pracas">
                                        {empresas.map((empresa) => (
                                            <div key={empresa.id} className="praca">
                                                <h2>{empresa.nomeFantasia || empresa.razaoSocial}</h2>
                                                <p><strong>Razão Social:</strong> {empresa.razaoSocial}</p>
                                                <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
                                                <p><strong>Telefone:</strong> {empresa.telefone}</p>
                                                <p><strong>Email:</strong> {empresa.email}</p>
                                                <p><strong>Endereço:</strong> {empresa.enderecoCompleto}</p>
                                                <p><strong>Setor:</strong> {empresa.setor}</p>
                                                {empresa.representante && (
                                                    <p><strong>Representante:</strong> {empresa.representante.nome}</p>
                                                )}
                                                <button onClick={() => buscarEmpresaPorId(empresa.id)}>Editar</button>
                                                <button onClick={() => deletarEmpresa(empresa.id)}>Deletar</button>
                                            </div>
                                        ))}
                                    </section>
                                </div>
                            );
                        }

                        export default CadastroEmpresas;