import Sequelize from 'sequelize'

// Importando os models da aplicação
import User from '../app/models/User'
import Recipients from '../app/models/Recipients'

// Importando a configuração de acesso ao banco
import databaseconfig from '../config/database'

// Colocando num array todos os registros de cada arquivo dos models
const models = [User, Recipients]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseconfig)

        models.map((model) => model.init(this.connection))
    }
}

export default new Database()
