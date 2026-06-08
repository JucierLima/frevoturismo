import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const categorias = ['todas', 'praia', 'cultura', 'gastronomia', 'historia', 'natureza', 'noturno']

const categoriaCor = {
  praia: 'bg-blue-50 text-blue-700 border-blue-200 border-t-blue-500',
  cultura: 'bg-purple-50 text-purple-700 border-purple-200 border-t-purple-500',
  gastronomia: 'bg-orange-50 text-orange-700 border-orange-200 border-t-orange-500',
  historia: 'bg-amber-50 text-amber-700 border-amber-200 border-t-amber-500',
  natureza: 'bg-green-50 text-green-700 border-green-200 border-t-green-500',
  noturno: 'bg-indigo-50 text-indigo-700 border-indigo-200 border-t-indigo-500',
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
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-black text-frevo-blue mb-3">
          Sugestões de <span className="text-frevo-green">Passeios</span>
        </h1>
        <p className="text-frevo-muted font-body max-w-xl mx-auto font-medium">
          Descubra os melhores pontos turísticos da Região Metropolitana do Recife com dicas de quem conhece.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`px-5 py-2 rounded-full font-body text-sm capitalize transition shadow-sm ${
              categoriaAtiva === cat
                ? 'bg-frevo-blue text-white font-black'
                : 'bg-white border border-frevo-border text-frevo-blue font-semibold hover:border-frevo-blue'
            }`}
          >
            {categoriaIcone[cat] || '🗺️'} {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center text-frevo-muted font-body font-bold py-20">Carregando passeios...</div>
      )}

      {erro && (
        <div className="text-center text-frevo-red font-body font-bold py-20">{erro}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {passeios.map((passeio) => (
          <PasseioCard key={passeio.id} passeio={passeio} />
        ))}
      </div>

      {!loading && passeios.length === 0 && !erro && (
        <div className="text-center text-frevo-muted font-body font-semibold py-20">
          Nenhum passeio encontrado nessa categoria.
        </div>
      )}
    </div>
  )
}

function PasseioCard({ passeio }) {
  // Pega a classe de cor top customizada para a categoria ou usa uma borda vermelha padrão do frevo
  const tBorda = categoriaCor[passeio.categoria] ? categoriaCor[passeio.categoria].split(' ').pop() : 'border-t-frevo-red'

  return (
    <div className={`bg-white border border-frevo-border shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col gap-4 border-t-4 ${tBorda}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-3xl mb-2 block">{categoriaIcone[passeio.categoria] || '🗺️'}</span>
          <h3 className="font-display text-xl font-bold text-frevo-blue">{passeio.titulo}</h3>
          <p className="text-frevo-muted text-sm font-body mt-1 font-semibold">📍 {passeio.local}</p>
        </div>
        <span className={`shrink-0 border px-3 py-1 rounded-full text-xs font-body font-bold capitalize ${categoriaCor[passeio.categoria] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
          {passeio.categoria}
        </span>
      </div>

      <p className="text-frevo-muted font-body text-sm leading-relaxed line-clamp-2 font-medium">
        {passeio.descricao}
      </p>

      {passeio.dica && (
        <div className="bg-frevo-green/10 border border-frevo-green/20 rounded-xl px-4 py-3">
          <p className="text-frevo-green text-xs font-body font-black mb-1">💡 Dica local</p>
          <p className="text-frevo-blue text-xs font-body leading-relaxed font-semibold">{passeio.dica}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-frevo-border">
        <span className="text-frevo-green font-black font-body text-base">
          {passeio.preco === 0 ? '🆓 Gratuito' : `R$ ${passeio.preco}`}
        </span>
        <Link
          to={`/passeios/${passeio.id}`}
          className="bg-frevo-blue text-white font-black px-5 py-2 rounded-full text-sm hover:bg-opacity-90 transition shadow-sm"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  )
}