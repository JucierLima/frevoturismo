const express = require('express')
const router = express.Router()
const { register, login, me } = require('../controllers/authController')
const authMiddleware = require('../middlewares/auth')

// Rotas públicas
router.post('/register', register)
router.post('/login', login)

// Rota protegida (precisa estar logado)
router.get('/me', authMiddleware, me)

module.exports = router