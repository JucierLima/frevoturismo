const express = require('express')
const router = express.Router()
const { listar, detalhe } = require('../controllers/passeiosController')

router.get('/', listar)
router.get('/:id', detalhe)

module.exports = router