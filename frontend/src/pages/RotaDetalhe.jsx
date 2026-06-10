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

  if (loading) return <div className="text-center text-frevo-muted font-body font-bold py-20">Carregando...</div>
  if (!rota) return <div className="text-center text-frevo-red font-body font-bold py-20">Rota não encontrada</div>

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-white relative">
      <Link to="/rotas" className="text-frevo-green font-black font-body text-sm hover:underline mb-6 inline-block">
        ← Voltar para rotas
      </Link>

      <div className="bg-white border border-frevo-border shadow-md rounded-2xl p-8 flex flex-col gap-6 border-t-4 border-t-frevo-blue">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display text-3xl font-black text-frevo-blue">{rota.titulo}</h1>
          <span className="shrink-0 bg-frevo-red/10 text-frevo-red border border-frevo-red/20 px-3 py-1 rounded-full text-sm font-body font-bold capitalize">
            {rota.categoria}
          </span>
        </div>

        <p className="text-frevo-muted font-body leading-relaxed font-medium">{rota.descricao}</p>

        <div className="flex gap-6 font-body text-sm">
          <div>
            <span className="text-frevo-muted font-medium">Duração</span>
            <p className="text-frevo-blue font-black mt-0.5">⏱ {rota.duracao}</p>
          </div>
          <div>
            <span className="text-frevo-muted font-medium">Valor</span>
            <p className="text-frevo-green font-black text-lg mt-0.5">
              {rota.preco === 0 ? 'Gratuito' : `R$ ${rota.preco}`}
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-frevo-blue mb-3">Pontos da rota</h2>
          <div className="flex flex-col gap-2">
            {rota.pontos?.map((ponto, i) => (
              <div key={ponto.nome} className="flex items-center gap-3 bg-frevo-blue/5 rounded-xl px-4 py-3 border border-frevo-blue/10">
                <span className="w-7 h-7 rounded-full bg-frevo-blue text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {i + 1}
                </span>
                <span className="text-frevo-blue font-body font-semibold">{ponto.nome}</span>
              </div>
            ))}
          </div>
        </div>

        {rota.Motorista && (
          <div className="border-t border-frevo-border pt-6">
            <h2 className="font-display text-xl font-bold text-frevo-blue mb-3">Guia responsável</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-12 h-12 rounded-full bg-frevo-red/10 border border-frevo-red/20 flex items-center justify-center font-display text-lg font-black text-frevo-red shadow-sm">
                {rota.Motorista.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-frevo-blue font-body font-bold">{rota.Motorista.name}</p>
                <div className="flex items-center gap-1 text-[#FFD400] text-sm mt-0.5">
                  {'★'.repeat(Math.round(rota.Motorista.avaliacao))} <span className="text-frevo-muted font-body font-semibold ml-1">{rota.Motorista.avaliacao}</span>
                </div>
              </div>
              <Link
                to={`/motoristas/${rota.Motorista.id}`}
                className="ml-auto border-2 border-frevo-blue text-frevo-blue bg-white px-4 py-2 rounded-full text-sm font-body font-black hover:bg-frevo-blue hover:text-white transition shadow-sm"
              >
                Ver perfil
              </Link>
            </div>
          </div>
        )}

        <div className="border-t border-frevo-border pt-6">
          <button
            onClick={() => setModalAberto(true)}
            className="w-full bg-frevo-green text-white font-black py-4 rounded-2xl text-lg hover:bg-opacity-90 transition shadow-md transform active:scale-95"
          >
            🚗 Solicitar esta rota
          </button>
          <p className="text-center text-frevo-muted font-body text-xs mt-3 font-medium">
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white border border-frevo-border shadow-2xl rounded-2xl p-8 w-full max-w-md"
           onClick={(e) => e.stopPropagation()}
      >
        {sucesso ? (
          <div className="text-center flex flex-col items-center gap-4 py-4">
            <div className="text-6xl">🎉</div>
            <h2 className="font-display text-2xl font-black text-frevo-blue">Solicitação enviada!</h2>
            <p className="text-frevo-muted font-body text-sm leading-relaxed font-medium">
              Recebemos seu pedido para a rota <strong className="text-frevo-blue font-black">{rota.titulo}</strong>. Você receberá uma confirmação no email <strong className="text-frevo-green font-black">{email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="bg-frevo-blue text-white font-black px-8 py-3 rounded-full hover:bg-opacity-90 transition mt-2 shadow-md"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl font-black text-frevo-blue">Solicitar rota</h2>
                <p className="text-frevo-green font-body font-black text-sm mt-1">{rota.titulo}</p>
              </div>
              <button
                onClick={onClose}
                className="text-frevo-muted hover:text-frevo-red text-3xl leading-none font-bold transition"
              >
                ×
              </button>
            </div>

            <div className="bg-frevo-blue/5 border border-frevo-blue/10 rounded-xl p-4 mb-6 flex gap-6 font-body text-sm justify-between">
              <div>
                <span className="text-frevo-blue/70 font-semibold">Duração</span>
                <p className="text-frevo-blue font-black mt-0.5">⏱ {rota.duracao}</p>
              </div>
              <div>
                <span className="text-frevo-blue/70 font-semibold">Valor</span>
                <p className="text-frevo-green font-black mt-0.5">
                  {rota.preco === 0 ? 'Gratuito' : `R$ ${rota.preco}`}
                </p>
              </div>
              {rota.Motorista && (
                <div>
                  <span className="text-frevo-blue/70 font-semibold">Guia</span>
                  <p className="text-frevo-blue font-black mt-0.5">{rota.Motorista.name.split(' ')[0]}</p>
                </div>
              )}
            </div>

            {erro && (
              <div className="bg-red-50 text-frevo-red border border-red-200 px-4 py-3 rounded-xl mb-4 text-sm font-body font-bold">
                {erro}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-frevo-blue font-black text-sm font-body mb-1 block">Seu nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="João Silva"
                  className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
                />
              </div>
              <div>
                <label className="text-frevo-blue font-black text-sm font-body mb-1 block">Seu email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition"
                />
              </div>
              <div>
                <label className="text-frevo-blue font-black text-sm font-body mb-1 block">Mensagem</label>
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Olá! Gostaria de fazer esta rota. Tenho disponibilidade no próximo fim de semana..."
                  rows={4}
                  className="w-full bg-frevo-bg border border-frevo-border rounded-xl px-4 py-3 text-frevo-blue font-body font-medium focus:outline-none focus:border-frevo-blue transition resize-none"
                />
              </div>
              <button
                onClick={handleEnviar}
                disabled={loading}
                className="bg-frevo-green text-white shadow-md font-black py-3 rounded-xl hover:bg-opacity-90 transition disabled:opacity-50 font-body transform active:scale-95 mt-2"
              >
                {loading ? 'Enviando...' : 'Enviar solicitação'}
              </button>
              <p className="text-center text-frevo-muted font-body text-xs font-semibold">
                Clique fora do modal para fechar
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}