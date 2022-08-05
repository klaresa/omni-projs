
// como nao ha um export default no yup, eh necessacio
// importar o arquivo inteiro e colocar na variavel Yup
import * as Yup from 'yup';
import User from '../models/User';

class UserController{
  async store(req, res){

    // esse schema do yup vai ajudar na verificacao
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ msg: "user already exists!" });
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({ id, name, email });
  }

  async update(req, res){

    // esse schema do yup vai ajudar na verificacao
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6)
          .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string()
          .when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "all fields are required" });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // verifica se o email ja eh cadastrado
    if (email && email !== user.email){
      const userExists = await User.findOne({ where: { email } });

      if (userExists){ // se for ele retorna como usuario existente
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // so faz a verificacao se a senha bate se ele informa a senha
    if (oldPassword && !(await user.checkpassword(oldPassword))) {
      return res.status(401).json({ error: 'password doesnt match' });
    }

    const { id, name, provider} = await user.update(req.body);
    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
