import { Model } from 'sequelize';
import Sequelize from "sequelize";

// para fazer o hash da senha usa-se o bcryptjs

class File extends Model {
  static init(sequelize) {
    super.init({
          name: Sequelize.STRING,
          path: Sequelize.STRING,
        }, {
          sequelize,
        }
    );

    return this; // retorna o proprio model
  }
}

export default File;
// pq nao preciso de *new* aqui? e no controller sim?

