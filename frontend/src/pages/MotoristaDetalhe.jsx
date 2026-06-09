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
    
    // AQUI ESTAVA O BUG: Corrigido para setLoadingFav
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

  if (loading) return <div className="text-center text-frevo-muted font-body font-bold py-20">Carregando...</div>
  if (!motorista) return <div className="text-center text-frevo-red font-body font-bold py-20">Motorista não encontrado</div>

  const iniciais = motorista.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-white">
      <Link to="/motoristas" className="text-frevo-green font-black font-body text-sm hover:underline mb-6 inline-block">
        ← Voltar para motoristas
      </Link>

      <div className="bg-white border border-frevo-border shadow-md rounded-2xl p-8 flex flex-col gap-6 border-t-4 border-t-frevo-blue">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-frevo-red/10 border-2 border-frevo-red/20 flex items-center justify-center font-display text-3xl font-black text-frevo-red">
              {iniciais}
            </div>
            <div>
              <h1 className="font-display text-3xl font-black text-frevo-blue">{motorista.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#FFD400]">{'★'.repeat(Math.round(motorista.avaliacao))}</span>
                <span className="text-frevo-muted font-body text-sm font-semibold">{motorista.avaliacao} · {motorista.totalViagens} viagens</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleFavoritar}
            disabled={loadingFav}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-body font-black text-sm transition shadow-sm disabled:opacity-50 ${
              favoritado
                ? 'bg-frevo-blue text-white'
                : 'border-2 border-frevo-blue text-frevo-blue bg-white hover:bg-frevo-blue hover:text-white'
            }`}
          >
            {loadingFav ? 'Aguarde...' : (favoritado ? '★ Favoritado' : '☆ Favoritar')}
          </button>
        </div>

        <p className="text-frevo-muted font-body leading-relaxed font-medium">{motorista.bio}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-frevo-bg border border-frevo-border rounded-xl p-4">
            <h3 className="font-body text-frevo-blue font-bold text-sm mb-3">Especialidades</h3>
            <div className="flex flex-wrap gap-2">
              {motorista.especialidades?.map((esp) => (
                <span key={esp} className="bg-frevo-red/10 text-frevo-red border border-frevo-red/20 px-3 py-1 rounded-full text-xs font-body font-bold">
                  {esp}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-frevo-bg border border-frevo-border rounded-xl p-4">
            <h3 className="font-body text-frevo-blue font-bold text-sm mb-3">Idiomas</h3>
            <div className="flex flex-wrap gap-2">
              {motorista.idiomas?.map((idioma) => (
                <span key={idioma} className="bg-white border border-frevo-border text-frevo-muted px-3 py-1 rounded-full text-xs font-body font-bold">
                  {idioma}
                </span>
              ))}
            </div>
          </div>
        </div>

        {motorista.telefone && (
          <div className="border-t border-frevo-border pt-4">
            <p className="text-frevo-muted font-body text-sm font-medium">Contato disponível</p>
            <p className="text-frevo-blue font-body font-black mt-1 text-lg">📞 {motorista.telefone}</p>
          </div>
        )}
      </div>
    </div>
  )
}