const { Rota, Motorista } = require('../models')

const listar = async (req, res) => {
  try {
    const { categoria } = req.query
    const where = categoria ? { categoria } : {}
    const rotas = await Rota.findAll({
      where,
      include: [{
        model: Motorista,
        attributes: ['id', 'name', 'avaliacao'],
      }],
      order: [['createdAt', 'DESC']],
    })
    return res.json(rotas)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar rotas' })
  }
}

const detalhe = async (req, res) => {
  try {
    const rota = await Rota.findByPk(req.params.id, {
      include: [{
        model: Motorista,
        attributes: ['id', 'name', 'avaliacao', 'bio', 'idiomas', 'especialidades'],
      }],
    })
    if (!rota) {
      return res.status(404).json({ error: 'Rota não encontrada' })
    }
    return res.json(rota)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar rota' })
  }
}

module.exports = { listar, detalhe }