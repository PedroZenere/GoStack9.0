import Sequelize, { Model } from 'sequelize'
// import { isBefore, subHours } from 'date-fns'

class DeliveryProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Orders, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    })
  }
}

export default DeliveryProblems
