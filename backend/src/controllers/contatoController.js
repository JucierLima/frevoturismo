const nodemailer = require('nodemailer')
const { Motorista, Rota } = require('../models')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const enviarSolicitacao = async (req, res) => {
  try {
    const { nome, email, mensagem, rotaId } = req.body

    if (!nome || !email || !mensagem || !rotaId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    const rota = await Rota.findByPk(rotaId, {
      include: [{ model: Motorista }],
    })

    if (!rota) {
      return res.status(404).json({ error: 'Rota não encontrada' })
    }

    await transporter.sendMail({
      from: `"Frevo Turismo" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Nova solicitação de rota: ${rota.titulo}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#C0392B">🎭 Nova Solicitação — Frevo Turismo</h2>
          <hr/>
          <h3>Dados da Rota</h3>
          <p><strong>Rota:</strong> ${rota.titulo}</p>
          <p><strong>Categoria:</strong> ${rota.categoria}</p>
          <p><strong>Duração:</strong> ${rota.duracao}</p>
          <p><strong>Valor:</strong> ${rota.preco === 0 ? 'Gratuito' : 'R$ ' + rota.preco}</p>
          ${rota.Motorista ? `<p><strong>Motorista:</strong> ${rota.Motorista.name}</p>` : ''}
          <hr/>
          <h3>Dados do Cliente</h3>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <h3>Mensagem</h3>
          <p style="background:#f5f5f5;padding:12px;border-radius:8px">${mensagem}</p>
          <hr/>
          <p style="color:#888;font-size:12px">Enviado pelo site Frevo Turismo</p>
        </div>
      `,
    })

    await transporter.sendMail({
      from: `"Frevo Turismo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Solicitação recebida — ${rota.titulo}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#C0392B">🎭 Solicitação Recebida!</h2>
          <p>Olá, <strong>${nome}</strong>!</p>
          <p>Recebemos sua solicitação para a rota <strong>${rota.titulo}</strong>. Nossa equipe entrará em contato em breve.</p>
          <hr/>
          <h3>Resumo da sua solicitação</h3>
          <p><strong>Rota:</strong> ${rota.titulo}</p>
          <p><strong>Duração:</strong> ${rota.duracao}</p>
          <p><strong>Valor:</strong> ${rota.preco === 0 ? 'Gratuito' : 'R$ ' + rota.preco}</p>
          ${rota.Motorista ? `<p><strong>Motorista:</strong> ${rota.Motorista.name}</p>` : ''}
          <hr/>
          <p style="color:#888;font-size:12px">Frevo Turismo — Região Metropolitana do Recife</p>
        </div>
      `,
    })

    return res.json({ success: true, message: 'Solicitação enviada com sucesso!' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao enviar solicitação' })
  }
}

module.exports = { enviarSolicitacao }