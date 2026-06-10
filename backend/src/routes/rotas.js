const express = require('express')
const router = express.Router()
const { listar, detalhe } = require('../controllers/rotasController')

router.get('/', listar)
router.get('/:id', detalhe)

module.exports = router