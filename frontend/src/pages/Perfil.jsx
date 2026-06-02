import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Perfil() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [totalFavoritos, setTotalFavoritos] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    api.get('/motoristas/usuario/favoritos')
      .then((res) => setTotalFavoritos(res.data.length))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user || loading) return <div className="text-center text-gray-400 py-20">Carregando...</div>

  const iniciais = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl text-white mb-8">
        Meu <span className="text-frevo-yellow">Perfil</span>
      </h1>

      <div className="bg-frevo-card border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-frevo-red/20 border-2 border-frevo-red/30 flex items-center justify-center font-display text-3xl text-frevo-yellow">
            {iniciais}
          </div>
          <div>
            <h2 className="font-display text-2xl text-white">{user.name}</h2>
            <p className="text-gray-400 font-body text-sm mt-1">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-3xl font-display text-frevo-yellow">{totalFavoritos}</p>
            <p className="text-gray-400 font-body text-sm mt-1">Motoristas favoritos</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <p className="text-3xl font-display text-frevo-yellow">🎭</p>
            <p className="text-gray-400 font-body text-sm mt-1">Viajante Frevo</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
          <Link
            to="/favoritos"
            className="w-full text-center border border-frevo-yellow text-frevo-yellow px-6 py-3 rounded-full font-body font-bold hover:bg-frevo-yellow hover:text-frevo-dark transition"
          >
            Ver meus favoritos ⭐
          </Link>
          <Link
            to="/motoristas"
            className="w-full text-center border border-white/20 text-gray-300 px-6 py-3 rounded-full font-body hover:border-frevo-yellow/50 transition"
          >
            Explorar motoristas
          </Link>
          <button
            onClick={handleLogout}
            className="w-full border border-red-500/40 text-red-400 px-6 py-3 rounded-full font-body hover:bg-red-500/10 transition"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  )
}
