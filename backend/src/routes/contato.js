const express = require('express')
const router = express.Router()
const { enviarSolicitacao } = require('../controllers/contatoController')

router.post('/', enviarSolicitacao)

module.exports = router
