
// o multer serve para guardar arquivos de img
import multer from 'multer';
import crypto from 'crypto'; // biblioteca para chegar caracteres aleatorios ja no node
import { extname, resolve } from 'path'; // aqui eh para usar o resolve

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => { // o file name aceita uma funcao com 3 parametros
      crypto.randomBytes(12, (err, res) => { // formato de callback, por isso o segundo parametro eh uma funcao
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname))
      });
    }
  }),
};
