import { Router } from 'express';
import multer from 'multer';
import AuthMiddleware from './app/middleware/auth';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import SessionDeliverymanController from './app/controllers/SessionDeliverymanController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import PackageController from './app/controllers/PackageController';
import FileController from './app/controllers/FileController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveryConfirmController from './app/controllers/DeliveryConfirmController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemController from './app/controllers/ProblemController';

import './database';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/sessions_deliveryman', SessionDeliverymanController.store);

routes.get('/deliveries/:id', DeliveriesController.index);
routes.get('/deliveries/:id/delivered', DeliveriesController.show);
routes.put(
  '/deliveries/:deliveryman_id/delivery/:id',
  DeliveriesController.update
);
routes.post(
  '/deliveries/:deliveryman_id/delivery/:id',
  DeliveryConfirmController.store
);

routes.post('/deliveries/:package_id/problems', ProblemController.store);
routes.get('/deliveries/:id/problems', DeliveryProblemController.show);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(AuthMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.put('/users', UserController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.get('/deliverymen/:id', DeliverymanController.show);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete(
  '/deliverymen/:id',
  upload.single('file'),
  DeliverymanController.delete
);

routes.get('/packages', PackageController.index);
routes.get('/packages/:id', PackageController.show);
routes.post('/packages', PackageController.store);

routes.put('/packages/:id', PackageController.update);
routes.delete('/packages/:id', PackageController.delete);

routes.get('/problems', ProblemController.index);

routes.delete(
  '/problems/:id/cancel-delivery',
  DeliveryProblemController.delete
);

export default routes;
