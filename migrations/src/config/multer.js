import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cd) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cd(err);

        return cd(null, res.toString('hex') + extname(file.originalname) );
      })
    },
  })
}
