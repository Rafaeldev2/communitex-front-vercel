import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import localStorageService from '../../services/localStorageService';

const UFPage = () => {
  const [ufs, setUfs] = useState(localStorageService.getItems('ufs'));
  const [editingUf, setEditingUf] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (uf) => {
    const savedUf = localStorageService.saveItem('ufs', uf);
    setUfs(localStorageService.getItems('ufs'));
    setShowForm(false);
    setEditingUf(null);
  };

  const handleDelete = (id) => {
    localStorageService.deleteItem('ufs', id);
    setUfs(localStorageService.getItems('ufs'));
  };

  const formFields = [
    { name: 'sigla', label: 'Sigla', required: true },
    { name: 'nome', label: 'Nome', required: true },
    { name: 'regiao', label: 'Região', required: true }
  ];

  return (
    <div className="page-container">
      <h1>Gestão de UFs</h1>
      
      {!showForm ? (
        <>
          <Button 
            label="Adicionar UF" 
            onClick={() => {
              setEditingUf(null);
              setShowForm(true);
            }} 
          />
          <Table 
            headers={['Sigla', 'Nome', 'Região']}
            data={ufs.map(uf => ({
              sigla: uf.sigla,
              nome: uf.nome,
              regiao: uf.regiao,
              id: uf.id
            }))}
            onEdit={(uf) => {
              setEditingUf(uf);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <Form 
          fields={formFields}
          initialData={editingUf || {}}
          onSubmit={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default UFPage;