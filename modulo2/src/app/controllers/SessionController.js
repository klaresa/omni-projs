import jwt from 'jsonwebtoken'; // importacao de modulo vem primeiro
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email: email}}); //pode ser so where: { email } pois os nomes sao os mesmos

    if (!user) {
      return res.status(401).json({msg: "User not found!"});
    }

    // como estou usando uma checagem pelo api do bcript, o metodo precisa ser await
    if (!(await user.checkpassword(password))) {
      return res.status(401).json({error: "Password doesnt match"});
    }

    const {id, name} = user; // o email ja tem

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, // primeiro parametro eh o payload (info adicionais)
          authConfig.secret, { // o segundo eh um hash unico criado por vc
          expiresIn: authConfig.expiresIn // esse eh o tempo para a expiracao
      }),
    });

  }
}

export default new SessionController();
