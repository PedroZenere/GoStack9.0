module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'signature_id', {
      type: Sequelize.INTEGER,
      references: { model: 'filesignatures', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('orders', 'signature_id')
  },
}
