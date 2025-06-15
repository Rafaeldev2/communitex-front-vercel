import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';
import './ListarUFPage.css';

const ListarUFPage = () => {
  const [ufs, setUFs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Carregar dados do localStorage
  useEffect(() => {
    const loadData = () => {
      const loadedUFs = localStorageService.getItems('ufs');
      setUFs(loadedUFs);
    };

    loadData();
  }, []);

  // Configuração das colunas da tabela
  const columns = [
    {
      key: 'sigla',
      title: 'Sigla',
      sortable: true
    },
    {
      key: 'nome',
      title: 'Nome',
      sortable: true
    },
    {
      key: 'regiao',
      title: 'Região',
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
      render: (value) => value ? `${value.toLocaleString()} km²` : '-'
    },
    {
      key: 'pib',
      title: 'PIB (R$)',
      sortable: true,
      render: (value) => value ? `R$ ${value.toLocaleString()}` : '-'
    }
  ];

  const handleAddNew = () => {
    navigate('/uf/cadastro');
  };

  const handleEdit = (uf) => {
    navigate(`/uf/cadastro/${uf.id}`);
  };

  const handleDelete = (uf) => {
    if (window.confirm(`Deseja excluir a UF ${uf.nome} (${uf.sigla})?`)) {
      localStorageService.deleteItem('ufs', uf.id);
      setUFs(localStorageService.getItems('ufs'));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Filtra as UFs baseado no termo de pesquisa
  const filteredUFs = ufs.filter(uf => {
    if (!searchTerm) return true;

    return (
      uf.sigla?.toLowerCase().includes(searchTerm) ||
      uf.nome?.toLowerCase().includes(searchTerm) ||
      uf.regiao?.toLowerCase().includes(searchTerm) ||
      uf.populacao?.toString().includes(searchTerm) ||
      uf.area?.toString().includes(searchTerm) ||
      uf.pib?.toString().includes(searchTerm)
    );
  });

  return (
    <div className="ufs-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Unidades Federativas</h1>
          <p>Gerencie o cadastro de UFs</p>
        </div>

        <div className="header-actions">
          <Button
            variant="primary"
            onClick={handleAddNew}
          >
            Nova UF
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          data={filteredUFs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSearch={handleSearch}
          enablePagination={true}
          itemsPerPage={10}
          searchPlaceholder="Pesquisar por sigla, nome, região..."
        />
      </div>
    </div>
  );
};

export default ListarUFPage;
