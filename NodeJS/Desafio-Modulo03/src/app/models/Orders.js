import Sequelize, { Model } from 'sequelize'
// import { isBefore, subHours } from 'date-fns'

class Orders extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Recipients, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    })
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    })
    this.belongsTo(models.Filesignature, {
      foreignKey: 'signature_id',
      as: 'signature',
    })
  }
}

export default Orders
