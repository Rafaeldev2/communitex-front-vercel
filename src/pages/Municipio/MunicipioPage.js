import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';

const MunicipioPage = () => {
  const [municipios, setMunicipios] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [editingMunicipio, setEditingMunicipio] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Carrega municípios e UFs do localStorage
    setMunicipios(localStorageService.getItems('municipios'));
    setUfs(localStorageService.getItems('ufs'));
  }, []);

  const handleSave = (municipio) => {
    const savedMunicipio = localStorageService.saveItem('municipios', municipio);
    setMunicipios(localStorageService.getItems('municipios'));
    setShowForm(false);
    setEditingMunicipio(null);
  };

  const handleDelete = (id) => {
    localStorageService.deleteItem('municipios', id);
    setMunicipios(localStorageService.getItems('municipios'));
  };

  const formFields = [
    { 
      name: 'ufId', 
      label: 'UF', 
      type: 'select',
      required: true,
      options: ufs.map(uf => ({
        value: uf.id,
        label: `${uf.sigla} - ${uf.nome}`
      }))
    },
    { name: 'nome', label: 'Nome do Município', required: true },
    { name: 'codigoIBGE', label: 'Código IBGE', required: true },
    { name: 'populacao', label: 'População', type: 'number' }
  ];

  return (
    <div className="page-container">
      <h1>Gestão de Municípios</h1>
      
      {!showForm ? (
        <>
          <Button 
            label="Adicionar Município" 
            onClick={() => {
              setEditingMunicipio(null);
              setShowForm(true);
            }} 
          />
          <Table 
            headers={['UF', 'Nome', 'Código IBGE', 'População']}
            data={municipios.map(m => {
              const uf = ufs.find(u => u.id === m.ufId);
              return {
                uf: uf ? `${uf.sigla} - ${uf.nome}` : 'N/A',
                nome: m.nome,
                codigoIBGE: m.codigoIBGE,
                populacao: m.populacao,
                id: m.id
              };
            })}
            onEdit={(municipio) => {
              setEditingMunicipio(municipio);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <Form 
          fields={formFields}
          initialData={editingMunicipio || {}}
          onSubmit={handleSave}
          onCancel={() => setShowForm(false)}
          submitLabel={editingMunicipio ? 'Atualizar' : 'Salvar'}
        />
      )}
    </div>
  );
};

export default MunicipioPage;