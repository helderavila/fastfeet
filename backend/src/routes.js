import { Router } from 'express';

import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DelivererController from './app/controllers/DelivererController';
import OrderController from './app/controllers/OrderController';
import OrderCheckInController from './app/controllers/OrderCheckInController';
import OrderCheckOutController from './app/controllers/OrderCheckOutController';
import OrderOpenedController from './app/controllers/OrderOpenedController';
import OrderClosedController from './app/controllers/OrderClosedController';

import authMiddleware from './app/middlewares/auth';
import authProvider from './app/middlewares/authProvider';

import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = Router();

routes.post('/users', UserController.store);

// Fazer login na aplicação
routes.post('/sessions', SessionController.store);

// Exibir um destinatario
routes.get('/recipients/:id', RecipientController.show);

// Encomendas
// Retirada da encomenda
routes.put('/orders/checkin/:orderId', OrderCheckInController.update);

// Entrega da encomenda
routes.put('/orders/checkout/:orderId', OrderCheckOutController.update);

// Exibir todos os pacotes disponiveis para retirada
routes.get('/orders/deliverer/:id', OrderOpenedController.index);

// Exibir todos os pacotes do entregador que foram entregues
routes.get('/orders/deliverer/:id/deliveries', OrderClosedController.index);

// Middleware para verificar token
routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

// Admin Destinatario
// Criar um destinatario
routes.post('/recipients', RecipientController.store);

// Exibir todos os destinatarios
routes.get('/recipients', RecipientController.index);

// Editar um destinatario
routes.put('/recipients/edit/:id', RecipientController.update);

// Admin entregadores
// Criar um novo entregador
routes.post('/deliverers', authProvider, DelivererController.store);

// Exibir todos os entregadores
routes.get('/deliverers', authProvider, DelivererController.index);

// Editar um entregador
routes.put('/deliverers/edit/:id', authProvider, DelivererController.update);

// Deletar um entregador
routes.delete(
  '/deliverers/delete/:id',
  authProvider,
  DelivererController.delete
);

// Admin order
// Criar uma nova entrega
routes.post('/orders', authProvider, OrderController.store);

// Exibir todas as entregas
routes.get('/orders', authProvider, OrderController.index);

// Editar alguma entrega
routes.put('/orders/edit/:id', authProvider, OrderController.update);

// Deletar alguma entrega
routes.delete('/orders/delete/:id', authProvider, OrderController.delete);

export default routes;
