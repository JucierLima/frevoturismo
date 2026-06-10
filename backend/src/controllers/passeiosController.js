const { Passeio } = require('../models')

const listar = async (req, res) => {
  try {
    const { categoria } = req.query
    const where = categoria ? { categoria } : {}
    const passeios = await Passeio.findAll({
      where,
      order: [['preco', 'ASC']],
    })
    return res.json(passeios)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar passeios' })
  }
}

const detalhe = async (req, res) => {
  try {
    const passeio = await Passeio.findByPk(req.params.id)
    if (!passeio) {
      return res.status(404).json({ error: 'Passeio não encontrado' })
    }
    return res.json(passeio)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar passeio' })
  }
}

module.exports = { listar, detalhe }