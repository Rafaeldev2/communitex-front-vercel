import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import localStorageService from '../../services/localStorageService';
import './CadastroIndicadores.css';

const CadastroIndicadores = () => {
  const navigate = useNavigate();
  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    // Carregar lista de comunidades
    const loadedComunidades = localStorageService.getItems('comunidades');
    setComunidades(loadedComunidades);
  }, []);

  const formFields = [
    {
      name: 'comunidadeId',
      label: 'Comunidade',
      type: 'select',
      required: true,
      options: comunidades.map(c => ({
        value: c.id,
        label: c.nome
      }))
    },
    {
      name: 'ano',
      label: 'Ano',
      type: 'number',
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
      defaultValue: new Date().getFullYear()
    },
    {
      name: 'idh',
      label: 'IDH',
      type: 'number',
      min: 0,
      max: 1,
      step: 0.001,
      placeholder: 'Ex: 0.750'
    },
    {
      name: 'rendaMedia',
      label: 'Renda Média (R$)',
      type: 'number',
      min: 0,
      step: 0.01,
      placeholder: 'Ex: 2500.00'
    },
    {
      name: 'escolaridadeMedia',
      label: 'Escolaridade Média (anos)',
      type: 'number',
      min: 0,
      max: 30,
      step: 0.1,
      placeholder: 'Ex: 12.5'
    },
    {
      name: 'taxaDesemprego',
      label: 'Taxa de Desemprego (%)',
      type: 'number',
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Ex: 7.5'
    },
    {
      name: 'observacoes',
      label: 'Observações',
      type: 'textarea',
      rows: 4,
      placeholder: 'Adicione observações relevantes sobre os indicadores'
    }
  ];

  const handleSubmit = (formData) => {
    try {
      // Converter valores para número quando necessário
      const indicadorData = {
        ...formData,
        idh: formData.idh ? parseFloat(formData.idh) : null,
        rendaMedia: formData.rendaMedia ? parseFloat(formData.rendaMedia) : null,
        escolaridadeMedia: formData.escolaridadeMedia ? parseFloat(formData.escolaridadeMedia) : null,
        taxaDesemprego: formData.taxaDesemprego ? parseFloat(formData.taxaDesemprego) : null
      };

      localStorageService.saveItem('indicadores', indicadorData);
      alert('Indicador cadastrado com sucesso!');
      navigate('/indicadores');
    } catch (error) {
      alert('Erro ao cadastrar indicador: ' + error.message);
    }
  };

  const handleCancel = () => {
    navigate('/indicadores');
  };

  return (
    <div className="cadastro-indicadores">
      <div className="page-header">
        <div className="header-title">
          <h1>Cadastro de Indicadores</h1>
          <p>Preencha os dados do novo indicador socioeconômico</p>
        </div>
      </div>

      <Form
        fields={formFields}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Salvar"
        initialData={{ ano: new Date().getFullYear() }}
      />
    </div>
  );
};

export default CadastroIndicadores;