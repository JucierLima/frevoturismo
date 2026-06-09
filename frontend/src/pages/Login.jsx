import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-frevo-bg">
      <div className="bg-white border border-frevo-border shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="font-display text-3xl font-black text-frevo-blue mb-2">Bem-vindo de volta</h1>
        <p className="text-frevo-muted font-body mb-8 font-medium">Entre na sua conta Frevo Turismo</p>

        {error && (
          <div className="bg-red-50 text-frevo-red border border-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-frevo-blue text-sm font-body font-bold mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-frevo-blue text-sm font-body font-bold block">Senha</label>
              <Link to="/esqueci-senha" className="text-frevo-green text-xs font-bold hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-frevo-blue text-white font-black py-3 rounded-xl hover:bg-opacity-90 transition mt-2 disabled:opacity-50 shadow-md transform hover:scale-[1.01]"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-frevo-muted font-body mt-6 text-sm font-medium">
          Não tem conta?{' '}
          <Link to="/register" className="text-frevo-green font-black hover:underline ml-1">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}