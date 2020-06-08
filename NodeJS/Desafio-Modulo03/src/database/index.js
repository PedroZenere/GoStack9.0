import Sequelize from 'sequelize'

// Importando os models da aplicação
import User from '../app/models/User'
import Recipients from '../app/models/Recipients'
import File from '../app/models/File'
import Filesignature from '../app/models/Filesignature'
import Deliveryman from '../app/models/Deliveryman'
import Orders from '../app/models/Orders'
import DeliveryProblems from '../app/models/DeliveryProblems'

// Importando a configuração de acesso ao banco
import databaseconfig from '../config/database'

// Colocando num array todos os registros de cada arquivo dos models
const models = [
  User,
  Recipients,
  Deliveryman,
  File,
  Orders,
  Filesignature,
  DeliveryProblems,
]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseconfig)

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()

/**
 * .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
 */
