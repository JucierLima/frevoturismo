import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setMensagem('')
    setLoading(true)
    try {
      const res = await api.post('/auth/forgot-password', { email })
      setMensagem(res.data.message)
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao processar solicitação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-frevo-bg">
      <div className="bg-white border border-frevo-border shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="font-display text-3xl font-black text-frevo-blue mb-2">Recuperar Senha</h1>
        <p className="text-frevo-muted font-body mb-8 font-medium text-sm">
          Digite o e-mail cadastrado. Enviaremos um link seguro para você redefinir sua senha.
        </p>

        {mensagem && (
          <div className="bg-frevo-green/10 text-frevo-green border border-frevo-green/20 px-4 py-3 rounded-xl mb-6 text-sm font-bold">
            {mensagem}
          </div>
        )}
        {erro && (
          <div className="bg-red-50 text-frevo-red border border-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-bold">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-frevo-blue text-sm font-body font-bold mb-1 block">Seu Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-frevo-blue text-white font-black py-3 rounded-xl hover:bg-opacity-90 transition mt-2 disabled:opacity-50 shadow-md transform hover:scale-[1.01]"
          >
            {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-frevo-green font-black hover:underline text-sm">
            ← Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  )
}