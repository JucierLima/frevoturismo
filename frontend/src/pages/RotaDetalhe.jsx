import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

export default function RotaDetalhe() {
  const { id } = useParams()
  const [rota, setRota] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(/rotas/${id})
      .then((res) => setRota(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center text-gray-400 py-20">Carregando...</div>
  if (!rota) return <div className="text-center text-red-400 py-20">Rota não encontrada</div>

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/rotas" className="text-frevo-yellow font-body text-sm hover:underline mb-6 inline-block">
        ← Voltar para rotas
      </Link>

      <div className="bg-frevo-card border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display text-3xl text-white">{rota.titulo}</h1>
          <span className="shrink-0 bg-frevo-red/20 text-frevo-orange border border-frevo-orange/20 px-3 py-1 rounded-full text-sm font-body capitalize">
            {rota.categoria}
          </span>
        </div>

        <p className="text-gray-300 font-body leading-relaxed">{rota.descricao}</p>

        <div className="flex gap-6 font-body text-sm">
          <div>
            <span className="text-gray-400">Duração</span>
            <p className="text-white font-bold">⏱️ {rota.duracao}</p>
          </div>
          <div>
            <span className="text-gray-400">Valor</span>
            <p className="text-frevo-yellow font-bold">
              {rota.preco === 0 ? 'Gratuito' : R$ ${rota.preco}}
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl text-white mb-3">Pontos da rota</h2>
          <div className="flex flex-col gap-2">
            {rota.pontos?.map((ponto, i) => (
              <div key={ponto.nome} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                <span className="w-7 h-7 rounded-full bg-frevo-yellow text-frevo-dark font-bold text-sm flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-white font-body">{ponto.nome}</span>
              </div>
            ))}
          </div>
        </div>

        {rota.Motorista && (
          <div className="border-t border-white/10 pt-6">
            <h2 className="font-display text-xl text-white mb-3">Guia responsável</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-frevo-red/20 border border-frevo-red/30 flex items-center justify-center font-display text-lg text-frevo-yellow">
                {rota.Motorista.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-white font-body font-bold">{rota.Motorista.name}</p>
                <p className="text-frevo-yellow text-sm">{'★'.repeat(Math.round(rota.Motorista.avaliacao))} {rota.Motorista.avaliacao}</p>
              </div>
              <Link
                to={/motoristas/${rota.Motorista.id}}
                className="ml-auto border border-frevo-yellow text-frevo-yellow px-4 py-2 rounded-full text-sm font-body hover:bg-frevo-yellow hover:text-frevo-dark transition"
              >
                Ver perfil
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}