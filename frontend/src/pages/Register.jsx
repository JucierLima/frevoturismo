import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }
    setLoading(true)
    try {
      await register({ name, email, password })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-frevo-card border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <h1 className="font-display text-3xl text-white mb-2">Crie sua conta</h1>
        <p className="text-gray-400 font-body mb-8">Junte-se ao Frevo Turismo</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-sm font-body mb-1 block">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
              className="w-full bg-frevo-dark border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-frevo-yellow transition"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm font-body mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full bg-frevo-dark border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-frevo-yellow transition"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm font-body mb-1 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full bg-frevo-dark border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-frevo-yellow transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-frevo-yellow text-frevo-dark font-bold py-3 rounded-xl hover:bg-yellow-400 transition mt-2 disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-gray-400 font-body mt-6 text-sm">
          Já tem conta?{' '}
          <Link to="/login" className="text-frevo-yellow hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}