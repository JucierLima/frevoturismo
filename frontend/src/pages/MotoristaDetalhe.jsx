import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function MotoristaDetalhe() {
  const { id } = useParams()
  const { user } = useAuth()
  const [motorista, setMotorista] = useState(null)
  const [loading, setLoading] = useState(true)
  const [favoritado, setFavoritado] = useState(false)
  const [loadingFav, setLoadingFav] = useState(false)

  useEffect(() => {
    api.get(`/motoristas/${id}`)
      .then((res) => setMotorista(res.data))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (user) {
      api.get('/motoristas/usuario/favoritos')
        .then((res) => {
          const isFav = res.data.some((m) => m.id === id)
          setFavoritado(isFav)
        })
        .catch(() => {})
    }
  }, [user, id])

  const handleFavoritar = async () => {
    if (!user) {
      alert('Você precisa estar logado para favoritar um motorista.')
      return
    }
    setLoadingFav(true)
    try {
      const res = await api.post(`/motoristas/${id}/favoritar`)
      setFavoritado(res.data.favoritado)
    } catch (err) {
      alert('Erro ao favoritar motorista.')
    } finally {
      setLoadingFav(false)
    }
  }

  if (loading) return <div className="text-center text-gray-400 py-20">Carregando...</div>
  if (!motorista) return <div className="text-center text-red-400 py-20">Motorista não encontrado</div>

  const iniciais = motorista.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/motoristas" className="text-frevo-yellow font-body text-sm hover:underline mb-6 inline-block">
        ← Voltar para motoristas
      </Link>

      <div className="bg-frevo-card border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-frevo-red/20 border-2 border-frevo-red/30 flex items-center justify-center font-display text-3xl text-frevo-yellow">
              {iniciais}
            </div>
            <div>
              <h1 className="font-display text-3xl text-white">{motorista.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-frevo-yellow">{'★'.repeat(Math.round(motorista.avaliacao))}</span>
                <span className="text-gray-400 font-body text-sm">{motorista.avaliacao} · {motorista.totalViagens} viagens</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleFavoritar}
            disabled={loadingFav}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-body font-bold text-sm transition ${
              favoritado
                ? 'bg-frevo-yellow text-frevo-dark'
                : 'border-2 border-frevo-yellow text-frevo-yellow hover:bg-frevo-yellow hover:text-frevo-dark'
            }`}
          >
            {favoritado ? '★ Favoritado' : '☆ Favoritar'}
          </button>
        </div>

        <p className="text-gray-300 font-body leading-relaxed">{motorista.bio}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-body text-gray-400 text-sm mb-3">Especialidades</h3>
            <div className="flex flex-wrap gap-2">
              {motorista.especialidades?.map((esp) => (
                <span key={esp} className="bg-frevo-red/20 text-frevo-orange border border-frevo-orange/20 px-3 py-1 rounded-full text-xs font-body">
                  {esp}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-body text-gray-400 text-sm mb-3">Idiomas</h3>
            <div className="flex flex-wrap gap-2">
              {motorista.idiomas?.map((idioma) => (
                <span key={idioma} className="bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-full text-xs font-body">
                  {idioma}
                </span>
              ))}
            </div>
          </div>
        </div>

        {motorista.telefone && (
          <div className="border-t border-white/10 pt-4">
            <p className="text-gray-400 font-body text-sm">Contato</p>
            <p className="text-white font-body font-bold mt-1">📞 {motorista.telefone}</p>
          </div>
        )}
      </div>
    </div>
  )
}
