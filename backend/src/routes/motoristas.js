const express = require('express')
const router = express.Router()
const {
  listar,
  detalhe,
  favoritar,
  listarFavoritos,
} = require('../controllers/motoristasController')
const authMiddleware = require('../middlewares/auth')

// Rotas públicas
router.get('/', listar)
router.get('/:id', detalhe)

// Rotas protegidas
router.post('/:id/favoritar', authMiddleware, favoritar)
router.get('/usuario/favoritos', authMiddleware, listarFavoritos)

module.exports = router