import jwt from 'jsonwebtoken'; // importa o jsonwebtoken
import authConfig from '../../config/auth'; // importa o segredo para descriptografar

// utiliza a sintaxe de async ... await para requisicoes
import { promisify } from 'util';


export default async(req,res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader){
    return res.status(401).json({error: "token not provided"});
  }
  console.log(authHeader);

  // essa desestruturacao ignora a primeira posicao e pega apenas a segunda
  // chamada de token
  const [, token] = authHeader.split(' ');

  console.log(token);

  try {

    // o promisify permite que use o await
    // ele transforma a funcao callback
    // e depois executa a segunda funcao passando o token e a chave secreta
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id; // criando uma var no req

    return next(); // passa para o controller
  } catch (e) {
    return res.status(401).json({ error: "invalid token" });
  }
}
