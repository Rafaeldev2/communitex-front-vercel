import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';

const LogradouroPage = () => {
  const [logradouros, setLogradouros] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [editingLogradouro, setEditingLogradouro] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setLogradouros(localStorageService.getItems('logradouros'));
    setBairros(localStorageService.getItems('bairros'));
  }, []);

  const handleSave = (logradouro) => {
    const savedLogradouro = localStorageService.saveItem('logradouros', logradouro);
    setLogradouros(localStorageService.getItems('logradouros'));
    setShowForm(false);
    setEditingLogradouro(null);
  };

  const handleDelete = (id) => {
    localStorageService.deleteItem('logradouros', id);
    setLogradouros(localStorageService.getItems('logradouros'));
  };

  const formFields = [
    { 
      name: 'bairroId', 
      label: 'Bairro', 
      type: 'select',
      required: true,
      options: bairros.map(b => ({
        value: b.id,
        label: b.nome
      }))
    },
    { name: 'nome', label: 'Nome do Logradouro', required: true },
    { name: 'cep', label: 'CEP', required: true },
    { name: 'tipo', label: 'Tipo', required: true },
    { name: 'complemento', label: 'Complemento' }
  ];

  return (
    <div className="page-container">
      <h1>Gestão de Logradouros</h1>
      
      {!showForm ? (
        <>
          <Button 
            label="Adicionar Logradouro" 
            onClick={() => {
              setEditingLogradouro(null);
              setShowForm(true);
            }} 
          />
          <Table 
            headers={['Bairro', 'Nome', 'Tipo', 'CEP', 'Complemento']}
            data={logradouros.map(l => {
              const bairro = bairros.find(b => b.id === l.bairroId);
              return {
                bairro: bairro ? bairro.nome : 'N/A',
                nome: l.nome,
                tipo: l.tipo,
                cep: l.cep,
                complemento: l.complemento || '-',
                id: l.id
              };
            })}
            onEdit={(logradouro) => {
              setEditingLogradouro(logradouro);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <Form 
          fields={formFields}
          initialData={editingLogradouro || {}}
          onSubmit={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default LogradouroPage;