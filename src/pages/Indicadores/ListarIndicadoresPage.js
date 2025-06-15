import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';


import './ListarIndicadoresPage.css';

const ListarIndicadoresPage = () => {
  const [indicadores, setIndicadores] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [currentIndicador, setCurrentIndicador] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Carregar dados do localStorage
  useEffect(() => {
    const loadData = () => {
      const loadedIndicadores = localStorageService.getItems('indicadores');
      const loadedComunidades = localStorageService.getItems('comunidades');
      setIndicadores(loadedIndicadores);
      setComunidades(loadedComunidades);
    };

    loadData();
  }, []);

  // Configuração das colunas da tabela
  const columns = [
    {
      key: 'comunidadeId',
      title: 'Comunidade',
      sortable: true,
      render: (value) => {
        const comunidade = comunidades.find(c => c.id === value);
        return comunidade ? comunidade.nome : 'N/A';
      }
    },
    {
      key: 'ano',
      title: 'Ano',
      sortable: true
    },
    {
      key: 'idh',
      title: 'IDH',
      sortable: true,
      render: (value) => value ? value.toFixed(3) : '-'
    },
    {
      key: 'rendaMedia',
      title: 'Renda Média (R$)',
      sortable: true,
      render: (value) => value ? `R$ ${value.toFixed(2)}` : '-'
    },
    {
      key: 'escolaridadeMedia',
      title: 'Escolaridade (anos)',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'taxaDesemprego',
      title: 'Desemprego (%)',
      sortable: true,
      render: (value) => value ? `${value}%` : '-'
    }
  ];

   // Manipuladores de ações
  const handleAddNew = () => {
    navigate('/indicadores/cadastro');
  };

  const handleSave = (indicador) => {
    const savedIndicador = localStorageService.saveItem('indicadores', {
      ...indicador,
      idh: parseFloat(indicador.idh) || null,
      rendaMedia: parseFloat(indicador.rendaMedia) || null,
      escolaridadeMedia: parseFloat(indicador.escolaridadeMedia) || null,
      taxaDesemprego: parseFloat(indicador.taxaDesemprego) || null
    });

    setIndicadores(localStorageService.getItems('indicadores'));
    setCurrentIndicador(null);
  };

  const handleEdit = (indicador) => {
    setCurrentIndicador(indicador);
  };

  const handleDelete = (indicador) => {
    if (window.confirm(`Excluir indicadores de ${comunidades.find(c => c.id === indicador.comunidadeId)?.nome || 'esta comunidade'} (${indicador.ano})?`)) {
      localStorageService.deleteItem('indicadores', indicador.id);
      setIndicadores(localStorageService.getItems('indicadores'));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Filtra os indicadores baseado no termo de pesquisa
  const filteredIndicadores = indicadores.filter(indicador => {
    if (!searchTerm) return true;

    const comunidadeNome = comunidades.find(c => c.id === indicador.comunidadeId)?.nome.toLowerCase() || '';
    const observacoes = indicador.observacoes?.toLowerCase() || '';

    return (
      comunidadeNome.includes(searchTerm) ||
      indicador.ano.toString().includes(searchTerm) ||
      (indicador.idh && indicador.idh.toString().includes(searchTerm)) ||
      (indicador.rendaMedia && indicador.rendaMedia.toString().includes(searchTerm)) ||
      (indicador.escolaridadeMedia && indicador.escolaridadeMedia.toString().includes(searchTerm)) ||
      (indicador.taxaDesemprego && indicador.taxaDesemprego.toString().includes(searchTerm)) ||
      observacoes.includes(searchTerm)
    );
  });

  return (
    <div className="indicadores-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Indicadores Socioeconômicos</h1>
          <p>Gerencie os dados socioeconômicos das comunidades</p>
        </div>

        <div className="header-actions">
          <Button
            variant="primary"
            onClick={handleAddNew}
          >
            Adicionar Indicador
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          data={filteredIndicadores}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSearch={handleSearch}
          enablePagination={true}
          itemsPerPage={10}
          searchPlaceholder="Pesquisar por comunidade, ano ou indicador..."
        />
      </div>

    </div>
  );
};

export default ListarIndicadoresPage;