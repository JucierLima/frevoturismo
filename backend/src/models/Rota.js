const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Rota = sequelize.define('Rota', {
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
  duracao: {
    type: DataTypes.STRING, // ex: "4 horas"
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM('cultural', 'gastronomia', 'praias', 'historia', 'natureza'),
    defaultValue: 'cultural',
  },
  pontos: {
    type: DataTypes.JSONB, // array de pontos com nome e coordenadas
    defaultValue: [],
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  motoristaId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
})

module.exports = Rota