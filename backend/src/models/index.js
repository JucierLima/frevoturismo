const sequelize = require('../config/database')
const User = require('./User')
const Motorista = require('./Motorista')
const Rota = require('./Rota')
const Passeio = require('./Passeio')
const Favorito = require('./Favorito')

// Associações
User.hasMany(Favorito, { foreignKey: 'userId' })
Favorito.belongsTo(User, { foreignKey: 'userId' })

Motorista.hasMany(Favorito, { foreignKey: 'motoristaId' })
Favorito.belongsTo(Motorista, { foreignKey: 'motoristaId' })

Motorista.hasMany(Rota, { foreignKey: 'motoristaId' })
Rota.belongsTo(Motorista, { foreignKey: 'motoristaId' })

module.exports = { sequelize, User, Motorista, Rota, Passeio, Favorito }