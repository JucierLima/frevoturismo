const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./src/routes/auth')
const motoristasRoutes = require('./src/routes/motoristas')
const rotasRoutes = require('./src/routes/rotas')
const passeiosRoutes = require('./src/routes/passeios')
const contatoRoutes = require('./src/routes/contato')

const { sequelize } = require('./src/models')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/motoristas', motoristasRoutes)
app.use('/api/rotas', rotasRoutes)
app.use('/api/passeios', passeiosRoutes)
app.use('/api/contato', contatoRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Frevo Turismo API rodando 🎭' })
})

const PORT = process.env.PORT || 3001

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Banco de dados sincronizado')
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco:', err)
  })