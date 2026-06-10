import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Favoritos() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [loadingDados, setLoadingDados] = useState(true)

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login')
      return
    }

    api.get('/motoristas/usuario/favoritos')
      .then((res) => {
        setFavorites(Array.isArray(res.data) ? res.data : [])
      })
      .catch((err) => {
        console.error("Erro ao buscar favoritos:", err)
        setFavorites([])
      })
      .finally(() => setLoadingDados(false))
  }, [user, navigate, authLoading])

  // Função refatorada com prevenção de evento e validação de ID
  const handleRemover = async (e, id) => {
    e.preventDefault(); // Impede que o clique se perca no HTML
    if (!id) return;

    try {
      await api.post(`/motoristas/${id}/favoritar`)
      setFavorites((prev) => prev.filter((m) => m && m.id !== id))
    } catch (error) {
      console.error(error);
      alert('Erro ao remover favorito')
    }
  }

  if (authLoading || loadingDados) {
    return <div className="text-center text-frevo-muted font-body font-bold py-20">Carregando...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-display text-4xl font-black text-frevo-blue mb-3">
          Meus <span className="text-frevo-green">Favoritos</span>
        </h1>
        <p className="text-frevo-muted font-body font-medium">Sua rede de motoristas locais de confiança.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4 bg-white border border-frevo-border rounded-2xl shadow-md border-t-4 border-t-frevo-blue">
          <span className="text-6xl text-[#FFD400]">⭐</span>
          <p className="text-frevo-blue font-body text-lg font-bold">Você ainda não favoritou nenhum motorista.</p>
          <Link
            to="/motoristas"
            className="bg-frevo-blue text-white font-black px-8 py-3 rounded-full hover:bg-opacity-90 transition mt-4 shadow-md"
          >
            Conhecer motoristas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((motorista) => {
            // Proteção estrita: se não tem o ID do motorista, não renderiza o card quebrado
            if (!motorista || !motorista.id) return null;

            const iniciais = motorista.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'MT'
            
            return (
              <div key={motorista.id} className="bg-white border border-frevo-border shadow-md rounded-2xl p-6 flex flex-col gap-4 transition hover:shadow-lg border-t-4 border-t-frevo-blue">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-frevo-red/10 border border-frevo-red/20 flex items-center justify-center font-display text-xl font-bold text-frevo-red shrink-0">
                    {iniciais}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-frevo-blue">{motorista.name}</h3>
                    <div className="flex items-center gap-1 text-[#FFD400] text-sm">
                      {'★'.repeat(Math.round(motorista.avaliacao || 0))}
                      <span className="text-frevo-muted font-body font-bold ml-1">{motorista.avaliacao}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {motorista.especialidades?.slice(0, 3).map((esp) => (
                    <span key={esp} className="bg-frevo-blue/5 text-frevo-blue border border-frevo-blue/10 px-3 py-1 rounded-full text-xs font-body font-bold">
                      {esp}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-frevo-border">
                  <Link
                    to={`/motoristas/${motorista.id}`}
                    className="flex-1 text-center bg-frevo-green text-white font-black px-4 py-2.5 rounded-full text-sm hover:bg-opacity-90 transition shadow-sm"
                  >
                    Ver perfil
                  </Link>
                  <button
                    onClick={(e) => handleRemover(e, motorista.id)}
                    className="bg-red-50 border border-red-200 text-frevo-red font-black px-5 py-2.5 rounded-full text-sm hover:bg-red-100 transition"
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