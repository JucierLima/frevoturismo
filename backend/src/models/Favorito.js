const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Favorito = sequelize.define('Favorito', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  motoristaId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
})

module.exports = Favorito