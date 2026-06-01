import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const categorias = ['todas', 'historia', 'gastronomia', 'praias', 'cultural', 'natureza']

const categoriaCor = {
  historia: 'bg-amber-900/30 text-amber-400 border-amber-700/30',
  gastronomia: 'bg-orange-900/30 text-orange-400 border-orange-700/30',
  praias: 'bg-blue-900/30 text-blue-400 border-blue-700/30',
  cultural: 'bg-purple-900/30 text-purple-400 border-purple-700/30',
  natureza: 'bg-green-900/30 text-green-400 border-green-700/30',
}

export default function Rotas() {
  const [rotas, setRotas] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas')

  useEffect(() => {
    const params = categoriaAtiva !== 'todas' ? `?categoria=${categoriaAtiva}` : ''
    api.get(`/rotas${params}`)
      .then((res) => setRotas(res.data))
      .catch(() => setErro('Erro ao carregar rotas'))
      .finally(() => setLoading(false))
  }, [categoriaAtiva])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl text-white mb-3">
          Rotas <span className="text-frevo-yellow">Turísticas</span>
        </h1>
        <p className="text-gray-400 font-body max-w-xl mx-auto">
          Explore roteiros exclusivos pela Região Metropolitana do Recife com guias locais experientes.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategoriaAtiva(cat); setLoading(true) }}
            className={`px-5 py-2 rounded-full font-body text-sm capitalize transition ${
              categoriaAtiva === cat
                ? 'bg-frevo-yellow text-frevo-dark font-bold'
                : 'border border-white/20 text-gray-300 hover:border-frevo-yellow/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center text-gray-400 py-20">Carregando rotas...</div>
      )}

      {erro && (
        <div className="text-center text-red-400 py-20">{erro}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rotas.map((rota) => (
          <RotaCard key={rota.id} rota={rota} />
        ))}
      </div>

      {!loading && rotas.length === 0 && !erro && (
        <div className="text-center text-gray-400 py-20">
          Nenhuma rota encontrada nessa categoria.
        </div>
      )}
    </div>
  )
}

function RotaCard({ rota }) {
  return (
    <div className="bg-frevo-card border border-white/10 rounded-2xl p-6 hover:border-frevo-yellow/40 transition flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-white leading-tight">{rota.titulo}</h3>
        <span className={`shrink-0 border px-3 py-1 rounded-full text-xs font-body capitalize ${categoriaCor[rota.categoria] || 'bg-white/5 text-gray-400 border-white/10'}`}>
          {rota.categoria}
        </span>
      </div>

      <p className="text-gray-400 font-body text-sm leading-relaxed line-clamp-2">
        {rota.descricao}
      </p>

      <div className="flex flex-wrap gap-2">
        {rota.pontos?.slice(0, 3).map((ponto) => (
          <span key={ponto.nome} className="bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-full text-xs font-body">
            📍 {ponto.nome}
          </span>
        ))}
        {rota.pontos?.length > 3 && (
          <span className="bg-white/5 text-gray-400 border border-white/10 px-3 py-1 rounded-full text-xs font-body">
            +{rota.pontos.length - 3} pontos
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
        <div className="flex gap-4 text-sm font-body">
          <span className="text-gray-400">⏱ {rota.duracao}</span>
          <span className="text-frevo-yellow font-bold">
            {rota.preco === 0 ? 'Gratuito' : `R$ ${rota.preco}`}
          </span>
        </div>
        <Link
          to={`/rotas/${rota.id}`}
          className="bg-frevo-yellow text-frevo-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-yellow-400 transition"
        >
          Ver rota
        </Link>
      </div>
    </div>
  )
}