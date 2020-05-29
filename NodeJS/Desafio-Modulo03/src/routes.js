import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import RecipientsController from './app/controllers/RecipientsController'
import DeliverymanController from './app/controllers/DeliverymanController'

import authMiddleware from './app/middleware/auth'

const { Router } = require('express')

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// midleware de autenticação
routes.use(authMiddleware)

routes.post('/recipients', RecipientsController.store)

routes.get('/deliveryman', DeliverymanController.index)
routes.post('/deliveryman', DeliverymanController.store)
routes.update('/deliveryman', DeliverymanController.update)
routes.delete('/deliveryman', DeliverymanController.delete)

module.exports = routes
