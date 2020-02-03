import { Router } from 'express';

import multer from 'multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DelivererController from './app/controllers/DelivererController';
import OrderController from './app/controllers/OrderController';
import PackageController from './app/controllers/PackageController';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/recipients/:id', RecipientController.show);

routes.put('/orders/withdraw/:orderId', PackageController.start);
routes.put('/orders/end/:orderId', PackageController.end);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.put('/recipients/edit/:id', RecipientController.update);

routes.post('/deliverers', DelivererController.store);
routes.get('/deliverers', DelivererController.index);
routes.put('/deliverers/edit/:id', DelivererController.update);
routes.delete('/deliverers/delete/:id', DelivererController.delete);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/edit/:id', OrderController.update);
routes.delete('/orders/delete/:id', OrderController.delete);

export default routes;
