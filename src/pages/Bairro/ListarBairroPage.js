import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';
import './ListarBairroPage.css';

const ListarBairroPage = () => {
  const [bairros, setBairros] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Carregar dados do localStorage
  useEffect(() => {
    const loadData = () => {
      const loadedBairros = localStorageService.getItems('bairros');
      const loadedMunicipios = localStorageService.getItems('municipios');
      setBairros(loadedBairros);
      setMunicipios(loadedMunicipios);
    };

    loadData();
  }, []);

  // Configuração das colunas da tabela
  const columns = [
    {
      key: 'nome',
      title: 'Nome do Bairro',
      sortable: true
    },
    {
      key: 'municipioId',
      title: 'Município',
      sortable: true,
      render: (value) => {
        const municipio = municipios.find(m => m.id === value);
        return municipio ? municipio.nome : '-';
      }
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
      key: 'regiao',
      title: 'Região',
      sortable: true
    }
  ];

  const handleAddNew = () => {
    navigate('/bairros/cadastro');
  };

  const handleEdit = (bairro) => {
    navigate(`/bairros/cadastro/${bairro.id}`);
  };

  const handleDelete = (bairro) => {
    if (window.confirm(`Deseja excluir o bairro ${bairro.nome}?`)) {
      localStorageService.deleteItem('bairros', bairro.id);
      setBairros(localStorageService.getItems('bairros'));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Filtra os bairros baseado no termo de pesquisa
  const filteredBairros = bairros.filter(bairro => {
    if (!searchTerm) return true;

    const municipioNome = municipios.find(m => m.id === bairro.municipioId)?.nome.toLowerCase() || '';

    return (
      bairro.nome?.toLowerCase().includes(searchTerm) ||
      municipioNome.includes(searchTerm) ||
      bairro.regiao?.toLowerCase().includes(searchTerm) ||
      bairro.populacao?.toString().includes(searchTerm) ||
      bairro.area?.toString().includes(searchTerm)
    );
  });

  return (
    <div className="bairros-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Bairros</h1>
          <p>Gerencie o cadastro de bairros</p>
        </div>

        <div className="header-actions">
          <Button
            variant="primary"
            onClick={handleAddNew}
          >
            Novo Bairro 
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          data={filteredBairros}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSearch={handleSearch}
          enablePagination={true}
          itemsPerPage={10}
          searchPlaceholder="Pesquisar por nome, município ou região..."
        />
      </div>
    </div>
  );
};

export default ListarBairroPage;
