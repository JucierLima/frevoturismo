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
    // Faz a busca no backend
    api.get('/motoristas/usuario/favoritos')
      .then((res) => {
        // Garante que o estado seja um array, mesmo se a API der pau
        setFavoritos(Array.isArray(res.data) ? res.data : [])
      })
      .catch((err) => {
        console.error("Erro ao buscar favoritos:", err)
        setFavoritos([])
      })
      .finally(() => setLoading(false))
  }, [user, navigate])

  const handleRemover = async (id) => {
    try {
      await api.post(`/motoristas/${id}/favoritar`)
      // Remove o motorista da tela instantaneamente após o clique
      setFavoritos((prev) => prev.filter((m) => m.id !== id))
    } catch {
      alert('Erro ao remover favorito')
    }
  }

  if (loading) return <div className="text-center text-frevo-muted py-20">Carregando favoritos...</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-display text-4xl text-frevo-navy mb-3">
          Meus <span className="text-frevo-green">Favoritos</span>
        </h1>
        <p className="text-frevo-muted font-body">Sua rede de motoristas locais de confiança.</p>
      </div>

      {favoritos.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4 bg-frevo-card border border-frevo-border rounded-2xl shadow-sm">
          <span className="text-6xl text-[#F4D03F]">⭐</span>
          <p className="text-frevo-navy font-body text-lg">Você ainda não favoritou nenhum motorista.</p>
          <Link
            to="/motoristas"
            className="bg-frevo-navy text-white font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition mt-4"
          >
            Conhecer motoristas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoritos.map((motorista) => {
            const iniciais = motorista.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'MT'
            
            return (
              <div key={motorista.id} className="bg-frevo-card border border-frevo-border shadow-sm rounded-2xl p-6 flex flex-col gap-4 transition hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-frevo-red/10 border border-frevo-red/20 flex items-center justify-center font-display text-xl text-frevo-red shrink-0">
                    {iniciais}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-frevo-navy">{motorista.name}</h3>
                    <div className="flex items-center gap-1 text-[#F4D03F] text-sm">
                      {'★'.repeat(Math.round(motorista.avaliacao || 0))}
                      <span className="text-frevo-muted ml-1">{motorista.avaliacao}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {motorista.especialidades?.slice(0, 3).map((esp) => (
                    <span key={esp} className="bg-frevo-bg text-frevo-navy border border-frevo-border px-3 py-1 rounded-full text-xs font-body font-medium">
                      {esp}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-frevo-border">
                  <Link
                    to={`/motoristas/${motorista.id}`}
                    className="flex-1 text-center bg-frevo-green text-white font-bold px-4 py-2.5 rounded-full text-sm hover:bg-opacity-90 transition shadow-sm"
                  >
                    Ver perfil
                  </Link>
                  <button
                    onClick={() => handleRemover(motorista.id)}
                    className="bg-red-50 border border-red-200 text-frevo-red font-bold px-5 py-2.5 rounded-full text-sm hover:bg-red-100 transition"
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