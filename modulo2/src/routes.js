const  { Router } = require('express');

import multer from 'multer'; // importa o multer
import multerConfig from './config/multer'; // importa o arquivo configurado

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth'; // importa os middlewares

const routes = new Router(); // cria um obt do tipo router
const upload = multer(multerConfig); // set o multer com as configs do arquivo

routes.post('/users', UserController.store); // em vez de passar o (req, res) passa-se o controler com o metodo a ser executado
routes.put('/users', authMiddleware, UserController.update);
routes.post('/sessions', SessionController.store);


// esse obj upload.single() permite o envio de apenas uma foto por vez
routes.post('/files', authMiddleware, upload.single('file'), FileController.store);

export default routes;
