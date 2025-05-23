import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';

const BairroPage = () => {
  const [bairros, setBairros] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [editingBairro, setEditingBairro] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setBairros(localStorageService.getItems('bairros'));
    setMunicipios(localStorageService.getItems('municipios'));
  }, []);

  const handleSave = (bairro) => {
    const savedBairro = localStorageService.saveItem('bairros', bairro);
    setBairros(localStorageService.getItems('bairros'));
    setShowForm(false);
    setEditingBairro(null);
  };

  const handleDelete = (id) => {
    localStorageService.deleteItem('bairros', id);
    setBairros(localStorageService.getItems('bairros'));
  };

  const formFields = [
    { 
      name: 'municipioId', 
      label: 'Município', 
      type: 'select',
      required: true,
      options: municipios.map(m => ({
        value: m.id,
        label: `${m.nome} (${m.codigoIBGE})`
      }))
    },
    { name: 'nome', label: 'Nome do Bairro', required: true },
    { name: 'zona', label: 'Zona', required: true },
    { name: 'area', label: 'Área (km²)', type: 'number' }
  ];

  return (
    <div className="page-container">
      <h1>Gestão de Bairros</h1>
      
      {!showForm ? (
        <>
          <Button 
            label="Adicionar Bairro" 
            onClick={() => {
              setEditingBairro(null);
              setShowForm(true);
            }} 
          />
          <Table 
            headers={['Município', 'Nome', 'Zona', 'Área']}
            data={bairros.map(b => {
              const municipio = municipios.find(m => m.id === b.municipioId);
              return {
                municipio: municipio ? municipio.nome : 'N/A',
                nome: b.nome,
                zona: b.zona,
                area: b.area,
                id: b.id
              };
            })}
            onEdit={(bairro) => {
              setEditingBairro(bairro);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <Form 
          fields={formFields}
          initialData={editingBairro || {}}
          onSubmit={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default BairroPage;