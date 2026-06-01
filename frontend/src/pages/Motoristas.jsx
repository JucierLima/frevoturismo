import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')

  useEffect(() => {
    api.get('/motoristas')
      .then((res) => setMotoristas(res.data))
      .catch(() => setErro('Erro ao carregar motoristas'))
      .finally(() => setLoading(false))
  }, [])

  const filtrados = motoristas.filter((m) =>
    m.name.toLowerCase().includes(busca.toLowerCase()) ||
    m.especialidades?.some((e) => e.toLowerCase().includes(busca.toLowerCase())) ||
    m.idiomas?.some((i) => i.toLowerCase().includes(busca.toLowerCase()))
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl text-white mb-3">
          Nossos <span className="text-frevo-yellow">Motoristas</span>
        </h1>
        <p className="text-gray-400 font-body max-w-xl mx-auto">
          Conheça os guias locais verificados. Favorite os seus preferidos e monte sua rede de confiança.
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por nome, especialidade ou idioma..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-frevo-card border border-white/10 rounded-xl px-5 py-3 text-white font-body focus:outline-none focus:border-frevo-yellow transition"
        />
      </div>

      {loading && (
        <div className="text-center text-gray-400 py-20">Carregando motoristas...</div>
      )}

      {erro && (
        <div className="text-center text-red-400 py-20">{erro}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map((motorista) => (
          <MotoristaCard key={motorista.id} motorista={motorista} />
        ))}
      </div>

      {!loading && filtrados.length === 0 && !erro && (
        <div className="text-center text-gray-400 py-20">
          Nenhum motorista encontrado para "{busca}"
        </div>
      )}
    </div>
  )
}

function MotoristaCard({ motorista }) {
  const iniciais = motorista.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="bg-frevo-card border border-white/10 rounded-2xl p-6 hover:border-frevo-yellow/40 transition flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-frevo-red/20 border border-frevo-red/30 flex items-center justify-center font-display text-xl text-frevo-yellow">
          {iniciais}
        </div>
        <div>
          <h3 className="font-display text-lg text-white">{motorista.name}</h3>
          <div className="flex items-center gap-1 text-frevo-yellow text-sm">
            {'★'.repeat(Math.round(motorista.avaliacao))}
            <span className="text-gray-400 ml-1">{motorista.avaliacao}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-400 font-body text-sm line-clamp-2 leading-relaxed">
        {motorista.bio}
      </p>

      <div className="flex flex-wrap gap-2">
        {motorista.especialidades?.slice(0, 3).map((esp) => (
          <span key={esp} className="bg-frevo-red/20 text-frevo-orange border border-frevo-orange/20 px-3 py-1 rounded-full text-xs font-body">
            {esp}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {motorista.idiomas?.map((idioma) => (
          <span key={idioma} className="bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-full text-xs font-body">
            {idioma}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        <span className="text-gray-400 text-xs font-body">{motorista.totalViagens} viagens</span>
        <Link
          to={`/motoristas/${motorista.id}`}
          className="bg-frevo-yellow text-frevo-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-yellow-400 transition"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  )
}