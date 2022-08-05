import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { promisify } from 'util';

// async aqui pois a autorizacao depende de uma resposta
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  // desestruturacao de array em que a posicao 0 eh descartada
  const [, token ] = authHeader.split(' ');

  try {
    // o verify funciona com a funcao de callback
    // fwt.verify(token, secret, (err, result) => {....

    // mas com o promisify permite que use a sintaxe async ... await
    // ele transforma uma funcao de callback em  async... await

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // guarda no obj req uma propriedade userId a ser acessada no UserController
    req.userId = decoded.id;

    // prossegue para a proxima rota
    return next();

  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }


}
