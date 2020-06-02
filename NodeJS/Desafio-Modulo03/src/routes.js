import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import RecipientsController from './app/controllers/RecipientsController'
import FileController from './app/controllers/FileController'
import FilesignatureController from './app/controllers/FilesignatureController'
import DeliverymanController from './app/controllers/DeliverymanController'
import OrdersController from './app/controllers/OrdersController'

import authMiddleware from './app/middleware/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// midleware de autenticação
routes.use(authMiddleware)

routes.get('/recipients', RecipientsController.index)
routes.post('/recipients', RecipientsController.store)
routes.put('/recipients/:id', RecipientsController.update)

routes.get('/deliveryman', DeliverymanController.index)
routes.post('/deliveryman', DeliverymanController.store)
routes.put('/deliveryman', DeliverymanController.update)
routes.delete('/deliveryman/:id', DeliverymanController.delete)

routes.post('/files', upload.single('file'), FileController.store)

routes.post(
  '/filesignature',
  upload.single('file'),
  FilesignatureController.store
)

routes.get('/orders', OrdersController.index)
routes.post('/orders', OrdersController.store)
routes.put('/orders', OrdersController.store)
routes.delete('/orders', OrdersController.store)

module.exports = routes
