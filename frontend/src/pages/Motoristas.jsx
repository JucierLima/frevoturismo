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
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-black text-frevo-blue mb-3">
          Nossos <span className="text-frevo-green">Motoristas</span>
        </h1>
        <p className="text-frevo-muted font-body max-w-xl mx-auto font-medium">
          Conheça os guias locais verificados. Favorite os seus preferidos e monte sua rede de confiança.
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por nome, especialidade ou idioma..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full bg-frevo-bg border border-frevo-border shadow-sm rounded-xl px-5 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
        />
      </div>

      {loading && (
        <div className="text-center text-frevo-muted font-body py-20 font-bold">Carregando motoristas...</div>
      )}

      {erro && (
        <div className="text-center text-frevo-red font-body py-20 font-bold">{erro}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map((motorista) => (
          <MotoristaCard key={motorista.id} motorista={motorista} />
        ))}
      </div>

      {!loading && filtrados.length === 0 && !erro && (
        <div className="text-center text-frevo-muted font-body py-20 font-semibold">
          Nenhum motorista encontrado para "{busca}"
        </div>
      )}
    </div>
  )
}

function MotoristaCard({ motorista }) {
  const iniciais = motorista.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="bg-white border border-frevo-border shadow-md rounded-2xl p-6 hover:shadow-lg transition flex flex-col gap-4 border-t-4 border-t-frevo-blue">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-frevo-red/10 border border-frevo-red/20 flex items-center justify-center font-display text-xl font-bold text-frevo-red">
          {iniciais}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-frevo-blue">{motorista.name}</h3>
          <div className="flex items-center gap-1 text-[#FFD400] text-sm">
            {'★'.repeat(Math.round(motorista.avaliacao))}
            <span className="text-frevo-muted font-body font-semibold ml-1">{motorista.avaliacao}</span>
          </div>
        </div>
      </div>

      <p className="text-frevo-muted font-body text-sm line-clamp-2 leading-relaxed font-medium">
        {motorista.bio}
      </p>

      <div className="flex flex-wrap gap-2">
        {motorista.especialidades?.slice(0, 3).map((esp) => (
          <span key={esp} className="bg-frevo-red/10 text-frevo-red border border-frevo-red/20 px-3 py-1 rounded-full text-xs font-body font-bold">
            {esp}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {motorista.idiomas?.map((idioma) => (
          <span key={idioma} className="bg-frevo-blue/5 text-frevo-blue border border-frevo-blue/10 px-3 py-1 rounded-full text-xs font-body font-bold">
            {idioma}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-frevo-border">
        <span className="text-frevo-muted text-xs font-body font-bold">{motorista.totalViagens} viagens</span>
        <Link
          to={`/motoristas/${motorista.id}`}
          className="bg-frevo-blue text-white font-black px-5 py-2 rounded-full text-sm hover:bg-opacity-90 transition shadow-sm"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  )
}