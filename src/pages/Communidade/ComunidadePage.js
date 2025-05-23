import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';

const ComunidadePage = () => {
  const [comunidades, setComunidades] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [editingComunidade, setEditingComunidade] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setComunidades(localStorageService.getItems('comunidades'));
    setMunicipios(localStorageService.getItems('municipios'));
  }, []);

  const handleSave = (comunidade) => {
    const savedComunidade = localStorageService.saveItem('comunidades', comunidade);
    setComunidades(localStorageService.getItems('comunidades'));
    setShowForm(false);
    setEditingComunidade(null);
  };

  const handleDelete = (id) => {
    localStorageService.deleteItem('comunidades', id);
    setComunidades(localStorageService.getItems('comunidades'));
  };

  const formFields = [
    { 
      name: 'municipioId', 
      label: 'Município', 
      type: 'select',
      required: true,
      options: municipios.map(m => ({
        value: m.id,
        label: m.nome
      }))
    },
    { name: 'nome', label: 'Nome da Comunidade', required: true },
    { name: 'tipo', label: 'Tipo de Comunidade', required: true },
    { name: 'populacao', label: 'População Estimada', type: 'number' },
    { name: 'descricao', label: 'Descrição', type: 'textarea' }
  ];

  return (
    <div className="page-container">
      <h1>Gestão de Comunidades</h1>
      
      {!showForm ? (
        <>
          <Button 
            label="Adicionar Comunidade" 
            onClick={() => {
              setEditingComunidade(null);
              setShowForm(true);
            }} 
          />
          <Table 
            headers={['Município', 'Nome', 'Tipo', 'População', 'Descrição']}
            data={comunidades.map(c => {
              const municipio = municipios.find(m => m.id === c.municipioId);
              return {
                municipio: municipio ? municipio.nome : 'N/A',
                nome: c.nome,
                tipo: c.tipo,
                populacao: c.populacao,
                descricao: c.descricao ? `${c.descricao.substring(0, 30)}...` : '-',
                id: c.id
              };
            })}
            onEdit={(comunidade) => {
              setEditingComunidade(comunidade);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <Form 
          fields={formFields}
          initialData={editingComunidade || {}}
          onSubmit={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ComunidadePage;