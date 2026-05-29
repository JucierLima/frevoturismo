
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative">
        {/* Background decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-frevo-dark via-frevo-card to-frevo-dark opacity-90" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-frevo-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-frevo-yellow/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-block bg-frevo-red/20 text-frevo-orange border border-frevo-orange/30 px-4 py-1.5 rounded-full text-sm mb-6 font-body">
            🗺️ Explore o Recife com quem conhece
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-tight text-white mb-6">
            Turismo de <span className="text-frevo-yellow">confiança</span> no coração do Nordeste
          </h1>
          <p className="font-body text-lg text-gray-300 mb-10 max-w-xl mx-auto">
            Conectamos você a motoristas locais experientes para rotas turísticas únicas pela Região Metropolitana do Recife. Conheça o frevo, o mangue, a história.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rotas"
              className="bg-frevo-yellow text-frevo-dark font-bold px-8 py-4 rounded-full text-lg hover:bg-yellow-400 transition transform hover:scale-105"
            >
              Ver Rotas Turísticas
            </Link>
            <Link
              to="/motoristas"
              className="border-2 border-frevo-yellow text-frevo-yellow px-8 py-4 rounded-full text-lg hover:bg-frevo-yellow hover:text-frevo-dark transition"
            >
              Conhecer Motoristas
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl text-center text-white mb-12">
          Por que escolher o <span className="text-frevo-yellow">Frevo Turismo</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🤝',
              title: 'Confiança',
              desc: 'Motoristas verificados com perfis detalhados, avaliações reais e especialidades declaradas.'
            },
            {
              icon: '🗺️',
              title: 'Rotas Exclusivas',
              desc: 'Roteiros turísticos cuidadosamente elaborados pela RMR: praias, cultura, gastronomia e história.'
            },
            {
              icon: '⭐',
              title: 'Sua Rede Local',
              desc: 'Favorite motoristas e construa sua própria rede de contatos locais confiáveis no Recife.'
            },
          ].map((item) => (
            <div key={item.title} className="bg-frevo-card border border-white/10 rounded-2xl p-8 text-center hover:border-frevo-yellow/40 transition">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
              <p className="font-body text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}