import React from 'react';
import ReactDOM from 'react-dom';
import {createServer, Model} from 'miragejs';
import { App } from './App';

createServer({
    // simula um banco de dados
    models: {
        transaction: Model, // schema
    },

    seeds(server) {
        server.db.loadData({
          transactions: [
            {
              id: 1,
              type: 'deposit',
              title: 'Freelance do site',
              category: 'Desenvolvimento',
              amount: 1000,
              createdAt: new Date('2021-02-03 09:00:00'),
            },
            {
              id: 2,
              type: 'withdraw',
              title: 'Aluguel de Carro',
              category: 'Carro',
              amount: 100,
              createdAt: new Date('2021-02-05 09:00:00'),
            },
          ],
        })
    },

    routes() {
        this.namespace = 'api';

        // simula uma requisicao de buscar todos
        this.get('/transactions', () => {
            return this.schema.all('transaction'); // schema é de UM
        });

        this.post('/transactions', (schema, request) => {
          const data = JSON.parse(request.requestBody);

          return schema.create('transaction', data);
        });
    },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

