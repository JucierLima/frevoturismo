import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Favoritos() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [favoritos, setFavoritos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    api.get('/motoristas/usuario/favoritos')
      .then((res) => setFavoritos(res.data))
      .finally(() => setLoading(false))
  }, [user])

  const handleRemover = async (id) => {
    try {
      await api.post(`/motoristas/${id}/favoritar`)
      setFavoritos((prev) => prev.filter((m) => m.id !== id))
    } catch {
      alert('Erro ao remover favorito')
    }
  }

  if (loading) return <div className="text-center text-gray-400 py-20">Carregando favoritos...</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl text-white mb-3">
          Meus <span className="text-frevo-yellow">Favoritos</span>
        </h1>
        <p className="text-gray-400 font-body">Sua rede de motoristas locais de confiança.</p>
      </div>

      {favoritos.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <span className="text-6xl">⭐</span>
          <p className="text-gray-400 font-body text-lg">Você ainda não favoritou nenhum motorista.</p>
          <Link
            to="/motoristas"
            className="bg-frevo-yellow text-frevo-dark font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition"
          >
            Conhecer motoristas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoritos.map((motorista) => {
            const iniciais = motorista.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
            return (
              <div key={motorista.id} className="bg-frevo-card border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-frevo-red/20 border border-frevo-red/30 flex items-center justify-center font-display text-xl text-frevo-yellow">
                    {iniciais}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-white">{motorista.name}</h3>
                    <div className="flex items-center gap-1 text-frevo-yellow text-sm">
                      {'★'.repeat(Math.round(motorista.avaliacao))}
                      <span className="text-gray-400 ml-1">{motorista.avaliacao}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {motorista.especialidades?.slice(0, 3).map((esp) => (
                    <span key={esp} className="bg-frevo-red/20 text-frevo-orange border border-frevo-orange/20 px-3 py-1 rounded-full text-xs font-body">
                      {esp}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto pt-3 border-t border-white/10">
                  <Link
                    to={`/motoristas/${motorista.id}`}
                    className="flex-1 text-center bg-frevo-yellow text-frevo-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-yellow-400 transition"
                  >
                    Ver perfil
                  </Link>
                  <button
                    onClick={() => handleRemover(motorista.id)}
                    className="border border-red-500/40 text-red-400 px-4 py-2 rounded-full text-sm hover:bg-red-500/10 transition"
                  >
                    Remover
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}