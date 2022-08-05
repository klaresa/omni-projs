// Componente: Bloco isolado de HTML, CSS E JS que nao interfere no resultado da aplicacao
// Propriedade: Informacoes que um componente PAI passa para o componente FILHO
// Estado: Informacoes mantidas pelo componente (Lembrar: imutabilidade)

import React, { useState, useEffect } from 'react';
import api from '../src/services/api';
import './global.css';
import './App.css';
import './Aside.css';
import './Main.css'

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();

  }, []); // o [] vazio eh para apenas executar uma vez

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
          <ul>
          {devs.map(dev => (
              <DevItem key={dev._id} dev={dev}/>
            ))}
          </ul>
      </main>
    </div>
  )
}

export default App;


