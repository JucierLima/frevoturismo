const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { User } = require('../models')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'frevo_jwt_super_secreto_2024', {
    expiresIn: '7d',
  })
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' })

    const userExists = await User.findOne({ where: { email } })
    if (userExists) return res.status(400).json({ error: 'Email já cadastrado' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })
    const token = generateToken(user.id)

    return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' })

    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Email ou senha incorretos' })

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.status(401).json({ error: 'Email ou senha incorretos' })

    const token = generateToken(user.id)
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: ['id', 'name', 'email', 'avatar'] })
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })
    return res.json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// NOVA FUNÇÃO: Solicitar Recuperação
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })
    
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

    // Gera um código seguro de 32 caracteres
    const resetToken = crypto.randomBytes(32).toString('hex')
    
    // Salva no banco com validade de 1 hora
    user.resetToken = resetToken
    user.resetTokenExpires = Date.now() + 3600000 
    await user.save()

    // Configura o enviador de emails (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const resetUrl = `${process.env.FRONTEND_URL}/nova-senha?token=${resetToken}`

    const mailOptions = {
      from: `"Frevo Turismo" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Recuperação de Senha - Frevo Turismo',
      html: `
        <h2>Recuperação de Senha</h2>
        <p>Olá, ${user.name}!</p>
        <p>Você solicitou a alteração da sua senha. Clique no link abaixo para criar uma nova:</p>
        <a href="${resetUrl}" style="background-color: #0044CC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Redefinir minha senha</a>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">Se você não solicitou isso, ignore este e-mail. O link expira em 1 hora.</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    return res.json({ message: 'E-mail de recuperação enviado com sucesso' })

  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao enviar e-mail' })
  }
}

// NOVA FUNÇÃO: Salvar a Senha Nova
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body
    if (!token || !newPassword) return res.status(400).json({ error: 'Token e nova senha são obrigatórios' })

    const user = await User.findOne({ 
      where: { resetToken: token } 
    })

    if (!user || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ error: 'Token inválido ou expirado. Solicite novamente.' })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    user.resetToken = null
    user.resetTokenExpires = null
    await user.save()

    return res.json({ message: 'Senha alterada com sucesso' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao alterar a senha' })
  }
}

module.exports = { register, login, me, forgotPassword, resetPassword }