const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Motorista = sequelize.define('Motorista', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  idiomas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['Português'],
  },
  especialidades: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  avaliacao: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0,
  },
  totalViagens: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
})

module.exports = Motorista