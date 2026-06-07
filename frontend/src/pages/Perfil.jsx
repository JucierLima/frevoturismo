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

  if (!user || loading) return <div className="text-center text-frevo-muted py-20">Carregando...</div>

  const iniciais = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl text-frevo-navy mb-8">
        Meu <span className="text-frevo-green">Perfil</span>
      </h1>

      <div className="bg-frevo-card border border-frevo-border shadow-sm rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-frevo-red/10 border-2 border-frevo-red/20 flex items-center justify-center font-display text-3xl text-frevo-red">
            {iniciais}
          </div>
          <div>
            <h2 className="font-display text-2xl text-frevo-navy">{user.name}</h2>
            <p className="text-frevo-muted font-body text-sm mt-1">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-frevo-bg border border-frevo-border rounded-xl p-4 text-center">
            <p className="text-3xl font-display text-[#F4D03F]">{totalFavoritos}</p>
            <p className="text-frevo-muted font-body text-sm mt-1">Motoristas favoritos</p>
          </div>
          <div className="bg-frevo-bg border border-frevo-border rounded-xl p-4 text-center">
            <p className="text-3xl font-display text-frevo-green">🎭</p>
            <p className="text-frevo-muted font-body text-sm mt-1">Viajante Frevo</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-frevo-border pt-4">
          <Link
            to="/favoritos"
            className="w-full text-center bg-frevo-green text-white px-6 py-3 rounded-full font-body font-bold hover:bg-opacity-90 transition shadow-sm"
          >
            Ver meus favoritos ⭐
          </Link>
          <Link
            to="/motoristas"
            className="w-full text-center bg-white border border-frevo-navy text-frevo-navy px-6 py-3 rounded-full font-body font-bold hover:bg-frevo-navy hover:text-white transition"
          >
            Explorar motoristas
          </Link>
          <button
            onClick={handleLogout}
            className="w-full border border-red-200 bg-red-50 text-frevo-red px-6 py-3 rounded-full font-body font-bold hover:bg-red-100 transition"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  )
}