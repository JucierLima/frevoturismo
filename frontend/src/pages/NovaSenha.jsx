import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../services/api'

export default function NovaSenha() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  
  const [newPassword, setNewPassword] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres')
      return
    }
    setErro('')
    setLoading(true)
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword })
      setMensagem(res.data.message)
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao redefinir senha')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-frevo-bg">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border-t-4 border-t-frevo-red max-w-md">
          <h2 className="text-frevo-red font-black text-2xl mb-4">Link Inválido</h2>
          <p className="text-frevo-blue font-medium mb-6">O link de recuperação está faltando. Solicite novamente.</p>
          <Link to="/esqueci-senha" className="bg-frevo-blue text-white font-black px-6 py-3 rounded-full shadow-sm">
            Solicitar novo link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-frevo-bg">
      <div className="bg-white border border-frevo-border shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="font-display text-3xl font-black text-frevo-blue mb-2">Criar Nova Senha</h1>
        <p className="text-frevo-muted font-body mb-8 font-medium text-sm">
          Digite a sua nova senha de acesso.
        </p>

        {mensagem ? (
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-frevo-green font-black mb-6">{mensagem}</p>
            <Link to="/login" className="bg-frevo-blue text-white font-black px-8 py-3 rounded-full hover:bg-opacity-90 transition shadow-md">
              Ir para o Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {erro && (
              <div className="bg-red-50 text-frevo-red border border-red-200 px-4 py-3 rounded-xl mb-2 text-sm font-bold">
                {erro}
              </div>
            )}
            <div>
              <label className="text-frevo-blue text-sm font-body font-bold mb-1 block">Nova Senha</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
                required
                className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-frevo-blue text-white font-black py-3 rounded-xl hover:bg-opacity-90 transition mt-2 disabled:opacity-50 shadow-md transform hover:scale-[1.01]"
            >
              {loading ? 'Salvando...' : 'Salvar Nova Senha'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}