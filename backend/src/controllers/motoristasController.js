const { Motorista, Favorito } = require('../models')

// GET /api/motoristas - lista todos
const listar = async (req, res) => {
  try {
    const motoristas = await Motorista.findAll({
      where: { ativo: true },
      order: [['avaliacao', 'DESC']],
    })
    return res.json(motoristas)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar motoristas' })
  }
}

// GET /api/motoristas/:id - detalhe de um motorista
const detalhe = async (req, res) => {
  try {
    const motorista = await Motorista.findByPk(req.params.id)
    if (!motorista) {
      return res.status(404).json({ error: 'Motorista não encontrado' })
    }
    return res.json(motorista)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar motorista' })
  }
}

// POST /api/motoristas/:id/favoritar - favorita ou desfavorita
const favoritar = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const jaFavoritou = await Favorito.findOne({
      where: { userId, motoristaId: id },
    })

    if (jaFavoritou) {
      await jaFavoritou.destroy()
      return res.json({ favoritado: false, message: 'Removido dos favoritos' })
    }

    await Favorito.create({ userId, motoristaId: id })
    return res.json({ favoritado: true, message: 'Adicionado aos favoritos' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao favoritar motorista' })
  }
}

// GET /api/motoristas/favoritos - lista favoritos do usuário
const listarFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.findAll({
      where: { userId: req.userId },
      include: [{ model: Motorista }],
    })

    // O pulo do gato: Acha o motorista seja qual for o nome maluco que o Sequelize inventou
    const motoristas = favoritos
      .map((f) => {
        const favBruto = f.get({ plain: true });
        // Adicionamos o "Motoristum" na lista de possibilidades
        return favBruto.Motoristum || favBruto.Motorista || favBruto.motorista;
      })
      .filter((m) => m != null) 

    return res.json(motoristas)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar favoritos' })
  }
}

module.exports = { listar, detalhe, favoritar, listarFavoritos }