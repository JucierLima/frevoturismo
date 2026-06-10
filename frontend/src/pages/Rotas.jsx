import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const categorias = ['todas', 'historia', 'gastronomia', 'praias', 'cultural', 'natureza']

const categoriaCor = {
  historia: 'bg-amber-50 text-amber-700 border-amber-200 border-t-amber-500',
  gastronomia: 'bg-orange-50 text-orange-700 border-orange-200 border-t-orange-500',
  praias: 'bg-blue-50 text-blue-700 border-blue-200 border-t-blue-500',
  cultural: 'bg-purple-50 text-purple-700 border-purple-200 border-t-purple-500',
  natureza: 'bg-green-50 text-green-700 border-green-200 border-t-green-500',
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
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-black text-frevo-blue mb-3">
          Rotas <span className="text-frevo-green">Turísticas</span>
        </h1>
        <p className="text-frevo-muted font-body max-w-xl mx-auto font-medium">
          Explore roteiros exclusivos pela Região Metropolitana do Recife com guias locais experientes.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategoriaAtiva(cat); setLoading(true) }}
            className={`px-5 py-2 rounded-full font-body text-sm capitalize transition shadow-sm ${
              categoriaAtiva === cat
                ? 'bg-frevo-blue text-white font-black'
                : 'bg-white border border-frevo-border text-frevo-blue font-semibold hover:border-frevo-blue'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center text-frevo-muted font-body font-bold py-20">Carregando rotas...</div>
      )}

      {erro && (
        <div className="text-center text-frevo-red font-body font-bold py-20">{erro}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rotas.map((rota) => (
          <RotaCard key={rota.id} rota={rota} />
        ))}
      </div>

      {!loading && rotas.length === 0 && !erro && (
        <div className="text-center text-frevo-muted font-body font-semibold py-20">
          Nenhuma rota encontrada nessa categoria.
        </div>
      )}
    </div>
  )
}

function RotaCard({ rota }) {
  const tBorda = categoriaCor[rota.categoria] ? categoriaCor[rota.categoria].split(' ').pop() : 'border-t-frevo-red'

  return (
    <div className={`bg-white border border-frevo-border shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col gap-4 border-t-4 ${tBorda}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-frevo-blue leading-tight">{rota.titulo}</h3>
        <span className={`shrink-0 border px-3 py-1 rounded-full text-xs font-body font-bold capitalize ${categoriaCor[rota.categoria] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
          {rota.categoria}
        </span>
      </div>

      <p className="text-frevo-muted font-body text-sm leading-relaxed line-clamp-2 font-medium">
        {rota.descricao}
      </p>

      <div className="flex flex-wrap gap-2">
        {rota.pontos?.slice(0, 3).map((ponto) => (
          <span key={ponto.nome} className="bg-frevo-blue/5 border border-frevo-blue/10 text-frevo-blue px-3 py-1 rounded-full text-xs font-body font-bold">
            📍 {ponto.nome}
          </span>
        ))}
        {rota.pontos?.length > 3 && (
          <span className="bg-frevo-red/5 border border-frevo-red/10 text-frevo-red px-3 py-1 rounded-full text-xs font-body font-bold">
            +{rota.pontos.length - 3} pontos
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-frevo-border">
        <div className="flex gap-4 text-sm font-body">
          <span className="text-frevo-muted font-bold">⏱ {rota.duracao}</span>
          <span className="text-frevo-green font-black">
            {rota.preco === 0 ? 'Gratuito' : `R$ ${rota.preco}`}
          </span>
        </div>
        <Link
          to={`/rotas/${rota.id}`}
          className="bg-frevo-blue text-white font-black px-5 py-2 rounded-full text-sm hover:bg-opacity-90 transition shadow-sm"
        >
          Ver rota
        </Link>
      </div>
    </div>
  )
}