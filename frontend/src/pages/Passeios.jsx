import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const categorias = ['todas', 'praia', 'cultura', 'gastronomia', 'historia', 'natureza', 'noturno']

const categoriaCor = {
  praia: 'bg-blue-900/30 text-blue-400 border-blue-700/30',
  cultura: 'bg-purple-900/30 text-purple-400 border-purple-700/30',
  gastronomia: 'bg-orange-900/30 text-orange-400 border-orange-700/30',
  historia: 'bg-amber-900/30 text-amber-400 border-amber-700/30',
  natureza: 'bg-green-900/30 text-green-400 border-green-700/30',
  noturno: 'bg-indigo-900/30 text-indigo-400 border-indigo-700/30',
}

const categoriaIcone = {
  praia: '🏖️',
  cultura: '🎭',
  gastronomia: '🍽️',
  historia: '🏛️',
  natureza: '🌿',
  noturno: '🌙',
}

export default function Passeios() {
  const [passeios, setPasseios] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas')

  useEffect(() => {
    setLoading(true)
    const params = categoriaAtiva !== 'todas' ? `?categoria=${categoriaAtiva}` : ''
    api.get(`/passeios${params}`)
      .then((res) => setPasseios(res.data))
      .catch(() => setErro('Erro ao carregar passeios'))
      .finally(() => setLoading(false))
  }, [categoriaAtiva])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl text-white mb-3">
          Sugestões de <span className="text-frevo-yellow">Passeios</span>
        </h1>
        <p className="text-gray-400 font-body max-w-xl mx-auto">
          Descubra os melhores pontos turísticos da Região Metropolitana do Recife com dicas de quem conhece.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`px-5 py-2 rounded-full font-body text-sm capitalize transition ${
              categoriaAtiva === cat
                ? 'bg-frevo-yellow text-frevo-dark font-bold'
                : 'border border-white/20 text-gray-300 hover:border-frevo-yellow/50'
            }`}
          >
            {categoriaIcone[cat] || '🗺️'} {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center text-gray-400 py-20">Carregando passeios...</div>
      )}

      {erro && (
        <div className="text-center text-red-400 py-20">{erro}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {passeios.map((passeio) => (
          <PasseioCard key={passeio.id} passeio={passeio} />
        ))}
      </div>

      {!loading && passeios.length === 0 && !erro && (
        <div className="text-center text-gray-400 py-20">
          Nenhum passeio encontrado nessa categoria.
        </div>
      )}
    </div>
  )
}

function PasseioCard({ passeio }) {
  return (
    <div className="bg-frevo-card border border-white/10 rounded-2xl p-6 hover:border-frevo-yellow/40 transition flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-3xl mb-2 block">{categoriaIcone[passeio.categoria] || '🗺️'}</span>
          <h3 className="font-display text-xl text-white">{passeio.titulo}</h3>
          <p className="text-gray-400 text-sm font-body mt-1">📍 {passeio.local}</p>
        </div>
        <span className={`shrink-0 border px-3 py-1 rounded-full text-xs font-body capitalize ${categoriaCor[passeio.categoria] || 'bg-white/5 text-gray-400 border-white/10'}`}>
          {passeio.categoria}
        </span>
      </div>

      <p className="text-gray-400 font-body text-sm leading-relaxed line-clamp-2">
        {passeio.descricao}
      </p>

      {passeio.dica && (
        <div className="bg-frevo-yellow/10 border border-frevo-yellow/20 rounded-xl px-4 py-3">
          <p className="text-frevo-yellow text-xs font-body font-bold mb-1">💡 Dica local</p>
          <p className="text-gray-300 text-xs font-body leading-relaxed">{passeio.dica}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
        <span className="text-frevo-yellow font-bold font-body">
          {passeio.preco === 0 ? '🆓 Gratuito' : `R$ ${passeio.preco}`}
        </span>
        <Link
          to={`/passeios/${passeio.id}`}
          className="bg-frevo-yellow text-frevo-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-yellow-400 transition"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  )
}