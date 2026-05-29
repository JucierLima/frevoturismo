
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-frevo-card border-b border-frevo-red/30 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="font-display text-2xl text-frevo-yellow tracking-wide">
        🎭 Frevo Turismo
      </Link>
      <div className="flex gap-6 items-center font-body text-sm">
        <Link to="/rotas" className="text-gray-300 hover:text-frevo-yellow transition">Rotas</Link>
        <Link to="/motoristas" className="text-gray-300 hover:text-frevo-yellow transition">Motoristas</Link>
        <Link to="/passeios" className="text-gray-300 hover:text-frevo-yellow transition">Passeios</Link>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-frevo-orange">Olá, {user.name.split(' ')[0]}</span>
            <button
              onClick={handleLogout}
              className="bg-frevo-red px-4 py-1.5 rounded-full text-white hover:bg-red-700 transition"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="border border-frevo-yellow text-frevo-yellow px-4 py-1.5 rounded-full hover:bg-frevo-yellow hover:text-frevo-dark transition">
              Entrar
            </Link>
            <Link to="/register" className="bg-frevo-yellow text-frevo-dark px-4 py-1.5 rounded-full font-bold hover:bg-yellow-400 transition">
              Cadastrar
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}