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

  if (loading) return <div className="text-center text-frevo-muted font-body font-bold py-20">Carregando...</div>
  if (!passeio) return <div className="text-center text-frevo-red font-body font-bold py-20">Passeio não encontrado</div>

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-white">
      <Link to="/passeios" className="text-frevo-green font-black font-body text-sm hover:underline mb-6 inline-block">
        ← Voltar para passeios
      </Link>

      <div className="bg-white border border-frevo-border shadow-md rounded-2xl p-8 flex flex-col gap-6 border-t-4 border-t-frevo-blue">
        <div>
          <span className="text-5xl mb-4 block">{categoriaIcone[passeio.categoria] || '🗺️'}</span>
          <h1 className="font-display text-3xl font-black text-frevo-blue mb-2">{passeio.titulo}</h1>
          <p className="text-frevo-muted font-body font-semibold">📍 {passeio.local}</p>
        </div>

        <p className="text-frevo-muted font-body leading-relaxed font-medium">{passeio.descricao}</p>

        <div className="flex items-center gap-6">
          <div>
            <p className="text-frevo-muted font-body text-sm font-medium">Categoria</p>
            <p className="text-frevo-blue font-body font-black capitalize mt-1">{passeio.categoria}</p>
          </div>
          <div>
            <p className="text-frevo-muted font-body text-sm font-medium">Entrada</p>
            <p className="text-frevo-green font-body font-black mt-1 text-lg">
              {passeio.preco === 0 ? 'Gratuito' : `R$ ${passeio.preco}`}
            </p>
          </div>
        </div>

        {passeio.dica && (
          <div className="bg-frevo-green/10 border border-frevo-green/20 rounded-2xl p-5 shadow-sm">
            <p className="text-frevo-green font-body font-black mb-2 flex items-center gap-1">💡 Dica do guia local</p>
            <p className="text-frevo-blue font-body leading-relaxed font-semibold text-sm">{passeio.dica}</p>
          </div>
        )}

        <div className="border-t border-frevo-border pt-4 mt-2">
          <Link
            to="/motoristas"
            className="inline-block bg-frevo-blue text-white font-black px-6 py-3 rounded-full hover:bg-opacity-90 transition shadow-md transform hover:scale-[1.02]"
          >
            Encontrar motorista para este passeio
          </Link>
        </div>
      </div>
    </div>
  )
}