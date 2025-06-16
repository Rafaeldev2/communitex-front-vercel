import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';
import './ListarComunidadePage.css';

const ListarComunidadePage = () => {
  const [comunidades, setComunidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Carregar dados do localStorage
  useEffect(() => {
    const loadData = () => {
      const loadedComunidades = localStorageService.getItems('comunidades');
      setComunidades(loadedComunidades);
    };

    loadData();
  }, []);

  // Configuração das colunas da tabela
  const columns = [
    {
      key: 'nome',
      title: 'Nome da Comunidade',
      sortable: true
    },
    {
      key: 'populacao',
      title: 'População',
      sortable: true,
      render: (value) => value ? value.toLocaleString() : '-'
    },
    {
      key: 'area',
      title: 'Área (km²)',
      sortable: true,
      render: (value) => value ? `${value.toFixed(2)} km²` : '-'
    },
    {
      key: 'bairro',
      title: 'Bairro',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'municipio',
      title: 'Município',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'uf',
      title: 'UF',
      sortable: true,
      render: (value) => value || '-'
    }
  ];

  const handleAddNew = () => {
    navigate('/comunidades/cadastro');
  };

  const handleEdit = (comunidade) => {
    navigate(`/comunidades/cadastro/${comunidade.id}`);
  };

  const handleDelete = (comunidade) => {
    if (window.confirm(`Deseja excluir a comunidade ${comunidade.nome}?`)) {
      localStorageService.deleteItem('comunidades', comunidade.id);
      setComunidades(localStorageService.getItems('comunidades'));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Filtra as comunidades baseado no termo de pesquisa
  const filteredComunidades = comunidades.filter(comunidade => {
    if (!searchTerm) return true;

    return (
      comunidade.nome?.toLowerCase().includes(searchTerm) ||
      comunidade.bairro?.toLowerCase().includes(searchTerm) ||
      comunidade.municipio?.toLowerCase().includes(searchTerm) ||
      comunidade.uf?.toLowerCase().includes(searchTerm) ||
      comunidade.populacao?.toString().includes(searchTerm) ||
      comunidade.area?.toString().includes(searchTerm)
    );
  });

  return (
    <div className="comunidades-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Comunidades</h1>
          <p>Gerencie o cadastro de comunidades</p>
        </div>

        <div className="header-actions">
          <Button
            variant="primary"
            onClick={handleAddNew}
          >
            Nova Comunidade
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          data={filteredComunidades}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSearch={handleSearch}
          enablePagination={true}
          itemsPerPage={10}
          searchPlaceholder="Pesquisar por nome, bairro, município..."
        />
      </div>
    </div>
  );
};

export default ListarComunidadePage;
