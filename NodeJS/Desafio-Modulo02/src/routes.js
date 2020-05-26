import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import RecipientsController from './app/controllers/RecipientsController'

import authMiddleware from './app/middleware/auth'

const { Router } = require('express')

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

// midleware de autenticação
routes.use(authMiddleware)

routes.post('/recipients', RecipientsController.store)

module.exports = routes
