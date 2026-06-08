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
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-frevo-bg">
      <div className="bg-white border border-frevo-border shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="font-display text-3xl font-black text-frevo-blue mb-2">Crie sua conta</h1>
        <p className="text-frevo-muted font-body mb-8 font-medium">Parabéns por escolher o Frevo Turismo</p>

        {error && (
          <div className="bg-red-50 text-frevo-red border border-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-frevo-blue text-sm font-body font-bold mb-1 block">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
              className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
            />
          </div>
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
            <label className="text-frevo-blue text-sm font-body font-bold mb-1 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-frevo-blue text-white font-black py-3 rounded-xl hover:bg-opacity-90 transition mt-2 disabled:opacity-50 shadow-md transform hover:scale-[1.01]"
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-frevo-muted font-body mt-6 text-sm font-medium">
          Já tem conta?{' '}
          <Link to="/login" className="text-frevo-green font-black hover:underline ml-1">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}