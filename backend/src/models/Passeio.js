const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Passeio = sequelize.define('Passeio', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM('praia', 'cultura', 'gastronomia', 'historia', 'natureza', 'noturno'),
    defaultValue: 'cultura',
  },
  preco: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dica: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
})

module.exports = Passeio