import Sequelize, { Model } from 'sequelize'

class Recipients extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                numero: Sequelize.INTEGER,
                complemento: Sequelize.STRING,
                estado: Sequelize.STRING,
                cidade: Sequelize.STRING,
                cep: Sequelize.STRING,
            },
            {
                sequelize,
            }
        )
        return this
    }
}

export default Recipients
