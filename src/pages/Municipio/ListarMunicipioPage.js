import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';
import './ListarMunicipioPage.css';

const ListarMunicipioPage = () => {
  const [municipios, setMunicipios] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = () => {
      const loadedMunicipios = localStorageService.getItems('municipios');
      const loadedUfs = localStorageService.getItems('UFs');
      setMunicipios(loadedMunicipios);
      setUfs(loadedUfs);
    };

    loadData();
  }, []);

  const columns = [
    {
      key: 'nome',
      title: 'Nome do Município',
      sortable: true
    },
    {
      key: 'uf',
      title: 'UF',
      sortable: true,
      render: (value) => {
        const uf = ufs.find(u => u.sigla === value);
        return uf ? `${uf.sigla} - ${uf.nome}` : value;
      }
    }
  ];

  const handleAddNew = () => {
    navigate('/municipios/cadastro');
  };

  const handleEdit = (municipio) => {
    navigate(`/municipios/cadastro/${municipio.id}`);
  };

  const handleDelete = (municipio) => {
    if (window.confirm(`Deseja excluir o município ${municipio.nome}?`)) {
      localStorageService.deleteItem('municipios', municipio.id);
      setMunicipios(localStorageService.getItems('municipios'));
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredMunicipios = municipios.filter(municipio => {
    if (!searchTerm) return true;

    const ufInfo = ufs.find(u => u.sigla === municipio.uf);
    const ufNome = ufInfo ? `${ufInfo.sigla} - ${ufInfo.nome}`.toLowerCase() : '';

    return (
      municipio.nome?.toLowerCase().includes(searchTerm) ||
      ufNome.includes(searchTerm)
    );
  });

  return (
    <div className="municipios-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Municípios</h1>
          <p>Gerencie o cadastro de municípios</p>
        </div>
        <div className="header-actions">
          <Button
            variant="primary"
            onClick={handleAddNew}
          >
            Novo Município
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          data={filteredMunicipios}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSearch={handleSearch}
          enablePagination={true}
          itemsPerPage={10}
          searchPlaceholder="Pesquisar por nome ou UF..."
        />
      </div>
    </div>
  );
};

export default ListarMunicipioPage;
