// arq que realiza a conexao com o db postgres no config/database
// carrega todos os models da app

import Sequelize from 'sequelize'; // quem realiza a conexao com o banco
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File]; // cada model entra nesse array

class Database{
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig); // aqui conecta com o db
    // a var this.connection eh a var esperada la no Model dentro do metodo init(sequelize)

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
