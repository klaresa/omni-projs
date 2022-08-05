// eu so posso usar essa sintaxe no node devido ao sucrase
// a sintaxe antiga do node eh const var = require('algo');
import express from 'express';
import routes from './routes';
import './database/index';
 // nao precisa passar o index.js

class App {
  constructor(){
    this.server = express();
    this.middlewares(); // eh necessario chamar aqui se nao nunca serao chamados
    this.routes();

  }

  middlewares(){
    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);

  }
}

// so posso usar assim devido ao sucrase: o normal eh module.exports = algo
export default new App().server; // exportando uma nova instancia de app

// uma vez que eh apenas o server que tem para ser exportado, pode-se exporta-lo diretamente
