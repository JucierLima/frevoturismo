import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function RotaDetalhe() {
  const { id } = useParams()
  const { user } = useAuth()
  const [rota, setRota] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)

  useEffect(() => {
    api.get(`/rotas/${id}`)
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
            <p className="text-white font-bold">⏱ {rota.duracao}</p>
          </div>
          <div>
            <span className="text-gray-400">Valor</span>
            <p className="text-frevo-yellow font-bold">
              {rota.preco === 0 ? 'Gratuito' : `R$ ${rota.preco}`}
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
                <p className="text-frevo-yellow text-sm">
                  {'★'.repeat(Math.round(rota.Motorista.avaliacao))} {rota.Motorista.avaliacao}
                </p>
              </div>
              <Link
                to={`/motoristas/${rota.Motorista.id}`}
                className="ml-auto border border-frevo-yellow text-frevo-yellow px-4 py-2 rounded-full text-sm font-body hover:bg-frevo-yellow hover:text-frevo-dark transition"
              >
                Ver perfil
              </Link>
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-6">
          <button
            onClick={() => setModalAberto(true)}
            className="w-full bg-frevo-yellow text-frevo-dark font-bold py-4 rounded-2xl text-lg hover:bg-yellow-400 transition"
          >
            🎭 Solicitar esta rota
          </button>
          <p className="text-center text-gray-400 font-body text-xs mt-3">
            Entraremos em contato em até 24 horas
          </p>
        </div>
      </div>

      {modalAberto && (
        <ModalContato
          rota={rota}
          user={user}
          onClose={() => setModalAberto(false)}
        />
      )}
    </div>
  )
}

function ModalContato({ rota, user, onClose }) {
  const [nome, setNome] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [mensagem, setMensagem] = useState('')
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState('')

  const handleEnviar = async () => {
    if (!nome || !email || !mensagem) {
      setErro('Preencha todos os campos')
      return
    }
    setErro('')
    setLoading(true)
    try {
      await api.post('/contato', {
        nome,
        email,
        mensagem,
        rotaId: rota.id,
      })
      setSucesso(true)
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-frevo-card border border-white/10 rounded-2xl p-8 w-full max-w-md">
        {sucesso ? (
          <div className="text-center flex flex-col items-center gap-4 py-4">
            <div className="text-6xl">🎉</div>
            <h2 className="font-display text-2xl text-white">Solicitação enviada!</h2>
            <p className="text-gray-400 font-body text-sm leading-relaxed">
              Recebemos seu pedido para a rota <strong className="text-white">{rota.titulo}</strong>. Você receberá uma confirmação no email <strong className="text-frevo-yellow">{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="bg-frevo-yellow text-frevo-dark font-bold px-8 py-3 rounded-full hover:bg-yellow-400 transition mt-2"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl text-white">Solicitar rota</h2>
                <p className="text-frevo-yellow font-body text-sm mt-1">{rota.titulo}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6 flex gap-6 font-body text-sm">
              <div>
                <span className="text-gray-400">Duração</span>
                <p className="text-white font-bold">⏱ {rota.duracao}</p>
              </div>
              <div>
                <span className="text-gray-400">Valor</span>
                <p className="text-frevo-yellow font-bold">
                  {rota.preco === 0 ? 'Gratuito' : `R$ ${rota.preco}`}
                </p>
              </div>
              {rota.Motorista && (
                <div>
                  <span className="text-gray-400">Guia</span>
                  <p className="text-white font-bold">{rota.Motorista.name.split(' ')[0]}</p>
                </div>
              )}
            </div>

            {erro && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm font-body">
                {erro}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-gray-400 text-sm font-body mb-1 block">Seu nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="João Silva"
                  className="w-full bg-frevo-dark border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-frevo-yellow transition"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-body mb-1 block">Seu email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-frevo-dark border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-frevo-yellow transition"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-body mb-1 block">Mensagem</label>
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Olá! Gostaria de fazer esta rota. Tenho disponibilidade no próximo fim de semana..."
                  rows={4}
                  className="w-full bg-frevo-dark border border-white/10 rounded-xl px-4 py-3 text-white font-body focus:outline-none focus:border-frevo-yellow transition resize-none"
                />
              </div>
              <button
                onClick={handleEnviar}
                disabled={loading}
                className="bg-frevo-yellow text-frevo-dark font-bold py-3 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50 font-body"
              >
                {loading ? 'Enviando...' : 'Enviar solicitação'}
              </button>
              <p className="text-center text-gray-500 font-body text-xs">
                Clique fora do modal para fechar
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}