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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-frevo-card border border-frevo-border shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="font-display text-3xl text-frevo-navy mb-2">Bem-vindo de volta</h1>
        <p className="text-frevo-muted font-body mb-8">Entre na sua conta Frevo Turismo</p>

        {error && (
          <div className="bg-red-50 text-frevo-red border border-red-200 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-frevo-muted text-sm font-body mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-navy font-body focus:outline-none focus:border-frevo-green transition"
            />
          </div>
          <div>
            <label className="text-frevo-muted text-sm font-body mb-1 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-navy font-body focus:outline-none focus:border-frevo-green transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-frevo-navy text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition mt-2 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-frevo-muted font-body mt-6 text-sm">
          Não tem conta?{' '}
          <Link to="/register" className="text-frevo-green font-bold hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}