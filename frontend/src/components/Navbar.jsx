import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import frevoLogo from '../assets/frevo-logo.png'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-frevo-card border-b border-frevo-border shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Aqui entra a logo substituindo o texto antigo */}
      <Link to="/" className="flex items-center transition transform hover:scale-105">
        <img 
          src={frevoLogo} 
          alt="Frevo Turismo Logo" 
          className="h-8 md:h-10 w-auto object-contain" 
        />
      </Link>

      <div className="flex gap-6 items-center font-body text-sm">
        <Link to="/rotas" className="text-frevo-navy font-medium hover:text-frevo-green transition">Rotas</Link>
        <Link to="/motoristas" className="text-frevo-navy font-medium hover:text-frevo-green transition">Motoristas</Link>
        <Link to="/passeios" className="text-frevo-navy font-medium hover:text-frevo-green transition">Passeios</Link>
        
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/favoritos" className="text-frevo-navy font-medium hover:text-frevo-green transition">Favoritos</Link>
            <Link to="/perfil" className="text-frevo-green font-bold hover:text-frevo-navy transition">
              Olá, {user.name.split(' ')[0]}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-50 border border-red-200 text-frevo-red px-4 py-1.5 rounded-full font-bold hover:bg-red-100 transition"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="border border-frevo-navy text-frevo-navy px-4 py-1.5 rounded-full font-bold hover:bg-frevo-navy hover:text-white transition">
              Entrar
            </Link>
            <Link to="/register" className="bg-frevo-green text-white px-4 py-1.5 rounded-full font-bold hover:bg-opacity-90 shadow-sm transition">
              Cadastrar
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}