import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliverymanDeliveryController from './app/controllers/DeliverymanDeliveryController';
import DeliverymanDeliveryCompleteController from './app/controllers/DeliverymanDeliveryCompleteController';
import ProblemController from './app/controllers/ProblemController';
import DeliveryWithProblemController from './app/controllers/DeliveryWithProblemController';
import OrderController from './app/controllers/OrderController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * Deliveryman
 */
routes.get('/deliveryman/:id', DeliverymanDeliveryController.index);
routes.put(
  '/deliveryman/:id/delivery/:delivery_id',
  DeliverymanDeliveryController.update
);

routes.get(
  '/deliveryman/:id/deliveries-complete',
  DeliverymanDeliveryCompleteController.index
);
routes.put(
  '/deliveryman/:id/deliveries-complete/:delivery_id',
  upload.single('file'),
  DeliverymanDeliveryCompleteController.update
);

routes.get('/delivery/:id/problems', ProblemController.index);
routes.post('/delivery/:id/problems', ProblemController.store);

routes.get('/deliveries/problems', DeliveryWithProblemController.index);
routes.delete('/deliveries/problems/:id', DeliveryWithProblemController.delete);

/**
 * Admin
 */
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.post(
  '/files/:category/:id',
  upload.single('file'),
  FileController.store
);

export default routes;
