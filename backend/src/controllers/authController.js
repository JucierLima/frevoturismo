const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'frevo_jwt_super_secreto_2024', {
    expiresIn: '7d',
  })
}


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' })
    }

    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = generateToken(user.id)

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha incorretos' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email ou senha incorretos' })
    }

    const token = generateToken(user.id)

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email', 'avatar'],
    })
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    return res.json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

module.exports = { register, login, me }