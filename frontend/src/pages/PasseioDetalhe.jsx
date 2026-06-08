import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

const categoriaIcone = {
  praia: '🏖️',
  cultura: '🎭',
  gastronomia: '🍽️',
  historia: '🏛️',
  natureza: '🌿',
  noturno: '🌙',
}

export default function PasseioDetalhe() {
  const { id } = useParams()
  const [passeio, setPasseio] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/passeios/${id}`)
      .then((res) => setPasseio(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center text-frevo-muted py-20">Carregando...</div>
  if (!passeio) return <div className="text-center text-frevo-red py-20">Passeio não encontrado</div>

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/passeios" className="text-frevo-green font-bold font-body text-sm hover:underline mb-6 inline-block">
        ← Voltar para passeios
      </Link>

      <div className="bg-frevo-card border border-frevo-border shadow-sm rounded-2xl p-8 flex flex-col gap-6">
        <div>
          <span className="text-5xl mb-4 block">{categoriaIcone[passeio.categoria] || '🗺️'}</span>
          <h1 className="font-display text-3xl text-frevo-navy mb-2">{passeio.titulo}</h1>
          <p className="text-frevo-muted font-body">📍 {passeio.local}</p>
        </div>

        <p className="text-frevo-muted font-body leading-relaxed">{passeio.descricao}</p>

        <div className="flex items-center gap-6">
          <div>
            <p className="text-frevo-muted font-body text-sm">Categoria</p>
            <p className="text-frevo-navy font-body font-bold capitalize mt-1">{passeio.categoria}</p>
          </div>
          <div>
            <p className="text-frevo-muted font-body text-sm">Entrada</p>
            <p className="text-frevo-green font-body font-bold mt-1">
              {passeio.preco === 0 ? 'Gratuito' : `R$ ${passeio.preco}`}
            </p>
          </div>
        </div>

        {passeio.dica && (
          <div className="bg-frevo-green/10 border border-frevo-green/20 rounded-2xl p-5">
            <p className="text-frevo-green font-body font-bold mb-2">💡 Dica do guia local</p>
            <p className="text-frevo-navy font-body leading-relaxed">{passeio.dica}</p>
          </div>
        )}

        <div className="border-t border-frevo-border pt-4 mt-2">
          <Link
            to="/motoristas"
            className="inline-block bg-frevo-navy text-white font-bold px-6 py-3 rounded-full hover:bg-opacity-90 transition shadow-sm"
          >
            Encontrar motorista para este passeio
          </Link>
        </div>
      </div>
    </div>
  )
}