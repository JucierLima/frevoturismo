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

  if (loading) return <div className="text-center text-frevo-muted py-20">Carregando...</div>
  if (!motorista) return <div className="text-center text-frevo-red py-20">Motorista não encontrado</div>

  const iniciais = motorista.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/motoristas" className="text-frevo-green font-bold font-body text-sm hover:underline mb-6 inline-block">
        ← Voltar para motoristas
      </Link>

      <div className="bg-frevo-card border border-frevo-border shadow-sm rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-frevo-red/10 border-2 border-frevo-red/20 flex items-center justify-center font-display text-3xl text-frevo-red">
              {iniciais}
            </div>
            <div>
              <h1 className="font-display text-3xl text-frevo-navy">{motorista.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {/* Estrelas continuam amarelas, texto cinza */}
                <span className="text-[#F4D03F]">{'★'.repeat(Math.round(motorista.avaliacao))}</span>
                <span className="text-frevo-muted font-body text-sm">{motorista.avaliacao} · {motorista.totalViagens} viagens</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleFavoritar}
            disabled={loadingFav}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-body font-bold text-sm transition ${
              favoritado
                ? 'bg-frevo-navy text-white'
                : 'border-2 border-frevo-navy text-frevo-navy hover:bg-frevo-navy hover:text-white'
            }`}
          >
            {favoritado ? '★ Favoritado' : '☆ Favoritar'}
          </button>
        </div>

        <p className="text-frevo-muted font-body leading-relaxed">{motorista.bio}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-frevo-bg border border-frevo-border rounded-xl p-4">
            <h3 className="font-body text-frevo-navy font-bold text-sm mb-3">Especialidades</h3>
            <div className="flex flex-wrap gap-2">
              {motorista.especialidades?.map((esp) => (
                <span key={esp} className="bg-frevo-red/10 text-frevo-red border border-frevo-red/20 px-3 py-1 rounded-full text-xs font-body">
                  {esp}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-frevo-bg border border-frevo-border rounded-xl p-4">
            <h3 className="font-body text-frevo-navy font-bold text-sm mb-3">Idiomas</h3>
            <div className="flex flex-wrap gap-2">
              {motorista.idiomas?.map((idioma) => (
                <span key={idioma} className="bg-white border border-frevo-border text-frevo-muted px-3 py-1 rounded-full text-xs font-body">
                  {idioma}
                </span>
              ))}
            </div>
          </div>
        </div>

        {motorista.telefone && (
          <div className="border-t border-frevo-border pt-4">
            <p className="text-frevo-muted font-body text-sm">Contato</p>
            <p className="text-frevo-navy font-body font-bold mt-1">📞 {motorista.telefone}</p>
          </div>
        )}
      </div>
    </div>
  )
}