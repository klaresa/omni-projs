import { Model } from 'sequelize';
import Sequelize from "sequelize";

// para fazer o hash da senha usa-se o bcryptjs
import bcript from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,

      // os campos aqui nao necessariamente refletem o db
      // sao campos que o usuario pode preencher
      password: Sequelize.VIRTUAL, // esse campo apenas existira no codigo e nunca no db
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    }, {
      sequelize,
    }
    );

    // funcionalidade do sequelize que sao trechos de codigos executados automaticamente
    // baseado em acoes do model, que no caso sera antes de salvar
    this.addHook('beforeSave', async (user) => {
      if (user.password) { // se existir um campo password no req.body
        user.password_hash = await bcript.hash(user.password, 8); // cria-se uma hash atraves da resposta da api do bcript
      }
    });

    return this; // retorna o proprio model
  }

  static associate(models){ // chama todos os models da app
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id' // estabelece a chave estrangeira a quem pertence o FIle
    });
  }

  // metodo para a checagem de senha usando o bcript.compare que podera ser chamado no UserController
  checkpassword(password){
    return bcript.compare(password, this.password_hash);
  }
}

export default User;
// pq nao preciso de *new* aqui? e no controller sim?

