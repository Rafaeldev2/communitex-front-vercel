import { useState } from 'react';
import Cadastro from '../../../../components/Cadastro/Cadastro.jsx';
import './CadastroBairroPage.css';
import axios from 'axios'

const CadastroBairroPage = () => {

const [currentPracaId, setCurrentPracaId] = useState(null);
const [error, setError] = useState('');
const [newPraca, setNewPraca] = useState({
    idPraca: '',
    nomePraca: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    latitude: '',
    longitude: '',
    descricao: '',
    fotoUrl: '',
    status: ''
});

  const handlePracaChange = (field, value) => {
        setNewPraca({ ...newPraca, [field]: value });
    };

  const formFields = [
  {
      name: 'nome',
      alley: 'logradouro',
      neighborhood: 'bairro',
      city: 'cidade',
      latitude: Number,
      longitude: Number,
      description: 'descrição',
      photoUrl: 'fotoUrl',
      status: 'status'
  }]

  const cadastrarPraca = async () => {
      if(newPraca.nomePraca.trim() !== '' &&
         newPraca.logradouro &&
         newPraca.bairro &&
         newPraca.cidade &&
         newPraca.latitude &&
         newPraca.longitude &&
         newPraca.descricao &&
         newPraca.fotoUrl &&
         newPraca.status ){

         const novaPraca = {
             nomePraca: newPraca.nomePraca.trim(),
             logradouro: newPraca.logradouro,
             bairro: newPraca.bairro,
             cidade: newPraca.cidade,
             latitude: newPraca.latitude,
             longitude: newPraca.longitude,
             descricao: newPraca.descricao,
             fotoUrl: newPraca.fotoUrl,
             status: newPraca.status
         };

         try{
             const response = await axios.post('http://localhost:8080/api/pracas', novaPraca);
             if(response.status === 201){

                 setNewPraca({
                     nomePraca: '',
                     logradouro: '',
                     bairro: '',
                     cidade: '',
                     latitude: '',
                     longitude: '',
                     descricao: '',
                     fotoUrl: '',
                     status: ''
                 });
                 setCurrentPracaId(null);
                 setError('');
             }
         }catch (error){
          console.error('Erro ao cadastrar praca' , error)
             setError('Erro ao cadastrar praca. Por favor, tente novamente.')
         }

      }else{
          setError('Preencha todos os campos antes de atualizar a praça')
      }
  };

  return (
    <Cadastro
      formFields={formFields}
      id={id}
      title="Praca"
      initialData={initialData || {}}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default CadastroBairroPage;


/*{
    name: 'municipioId',
        label: 'Município',
    type: 'select',
    required: true,
    options: municipios.map(m => ({
    value: m.id,
    label: m.nome
}))
},
{
    name: 'populacao',
        label: 'População',
    type: 'number',
    min: 0,
    placeholder: 'Digite a população estimada'
},
{
    name: 'area',
        label: 'Área (km²)',
    type: 'number',
    min: 0,
    step: '0.01',
    placeholder: 'Digite a área em km²'
},
{
    name: 'regiao',
        label: 'Região',
    type: 'text',
    placeholder: 'Digite a região do bairro'
},
{
    name: 'descricao',
        label: 'Descrição',
    type: 'textarea',
    rows: 4,
    placeholder: 'Descreva características relevantes do bairro'
}
];


const handleSubmit = (formData) => {
    try {
      const bairroData = {
        ...formData,
        populacao: formData.populacao ? parseInt(formData.populacao) : null,
        area: formData.area ? parseFloat(formData.area) : null
      };

      const municipio = municipios.find(m => m.id === formData.municipioId);
      if (municipio) {
        bairroData.municipio = municipio.nome;
        bairroData.uf = municipio.uf;
      }

      localStorageService.saveItem('bairros', bairroData);
      alert(id ? 'Bairro atualizado com sucesso!' : 'Bairro cadastrado com sucesso!');
      navigate('/bairros');
    } catch (error) {
      alert('Erro ao salvar bairro: ' + error.message);
    }
  };

  const handleCancel = () => {
    navigate('/bairros');
  };

  if (id && !initialData) {
    return <div>Carregando...</div>;
  }*/