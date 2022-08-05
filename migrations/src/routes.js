import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionControler from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionControler.store);

// middleware global que eh chamado antes de prosseguir para a proxima funcao

routes.use(authMiddleware);
// isso eh um middleware local pois eh passado no parametro
routes.put('/users', UserController.updatee);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
