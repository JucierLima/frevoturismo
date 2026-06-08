import { useState } from 'react'
import { Link } from 'react-router-dom'
import mapaPE from '../assets/mapa-pe.png'
import bgFrevo from '../assets/bg-frevo.jpg'
import imgRecifeAntigo from '../assets/recife-antigo.jpg'
import imgOlindaAlto from '../assets/olinda-alta.jpg'
import imgInstitutoRicardoBrennand from '../assets/instituto.jpg'

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      
      {/* 1. HERO SECTION (Sombrinhas em modo abstrato e suave - Foco total na leitura) */}
      <section 
        className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgFrevo})` }}
      >
        {/* Camada de 85% com desfoque: transforma o fundo em um degradê de cores suave */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-md" />

        <div className="relative z-10 max-w-3xl">
          <img 
            src={mapaPE} 
            alt="Mapa de Pernambuco" 
            className="block h-28 md:h-36 w-auto object-contain mx-auto mb-6 drop-shadow-[0_4px_20px_rgba(10,81,197,0.2)]"
          />
          
          <h1 className="font-display text-5xl md:text-6xl font-black leading-tight text-frevo-blue mb-6">
            Turismo de <span className="text-frevo-green">confiança</span> no coração do Nordeste
          </h1>
          <p className="font-body text-lg text-frevo-blue/80 mb-10 max-w-xl mx-auto font-bold">
            Conectamos você a motoristas locais experientes para rotas turísticas únicas pela Região Metropolitana do Recife. Conheça o frevo, o mangue, a história.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rotas"
              className="bg-frevo-red text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-opacity-90 transition transform hover:scale-105 shadow-md"
            >
              Ver Rotas Turísticas
            </Link>
            <Link
              to="/motoristas"
              className="border-2 border-frevo-blue bg-white/80 text-frevo-blue font-bold px-8 py-4 rounded-full text-lg hover:bg-frevo-blue hover:text-white transition shadow-sm"
            >
              Conhecer Motoristas
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION (Branco limpo e focado) */}
      <section className="relative py-20 px-6 bg-white border-t border-frevo-border">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-black text-center text-frevo-blue mb-12">
            Por que escolher o <span className="text-frevo-red">Frevo Turismo</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤝',
                title: 'Confiança',
                borderColor: 'border-t-frevo-red',
                desc: 'Motoristas verificados com perfis detalhados, avaliações reais e especialidades declaradas.'
              },
              {
                icon: '🗺️',
                title: 'Rotas Exclusivas',
                borderColor: 'border-t-frevo-blue',
                desc: 'Roteiros turísticos cuidadosamente elaborados pela RMR: praias, cultura, gastronomia e história.'
              },
              {
                icon: '⭐',
                title: 'Sua Rede Local',
                borderColor: 'border-t-frevo-green',
                desc: 'Favorite motoristas e construa sua própria rede de contatos locais confiáveis no Recife.'
              },
            ].map((item) => (
              <div 
                key={item.title} 
                className={`bg-white border-t-4 ${item.borderColor} border-x border-b border-frevo-border rounded-2xl p-8 text-center hover:shadow-xl transition-all shadow-md`}
              >
                <div className="text-5xl mb-4 drop-shadow-sm">{item.icon}</div>
                <h3 className="font-display text-xl font-bold text-frevo-blue mb-3">{item.title}</h3>
                <p className="font-body text-frevo-muted leading-relaxed text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CARROSSEL DE DESTAQUES (Fundo Off-White azulado para quebrar o brancão) */}
      <CarrosselDestaques />

    </div>
  )
}

function CarrosselDestaques() {
  const [ativo, setAtivo] = useState(0)

  const locais = [
    { 
      nome: "Olinda Histórica", 
      img: imgOlindaAlto, 
      desc: "Casarios coloridos, ladeiras, igrejas seculares e o verdadeiro berço da cultura pernambucana." 
    },
    { 
      nome: "Recife Antigo", 
      img: imgRecifeAntigo, 
      desc: "O coração da cidade, rodeado de arte, arquitetura clássica e a brisa do Rio Capibaribe." 
    },
    { 
      nome: "Instituto Ricardo Brennand", 
      img: imgInstitutoRicardoBrennand, 
      desc: "Um dos maiores e mais premiados complexos culturais do Brasil, e funciona como um museu a céu aberto com arquitetura em estilo medieval" 
    }
  ]

  return (
    <section className="py-20 px-6 bg-frevo-blue/5 border-t border-frevo-border">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl font-black text-frevo-blue mb-12">
          Explore nossos <span className="text-frevo-green">Principais Destinos</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          {locais.map((local, index) => (
            <button
              key={local.nome}
              onClick={() => setAtivo(index)}
              className={`transition-all duration-500 ease-in-out transform ${
                ativo === index 
                  ? 'scale-110 ring-4 ring-frevo-green z-10 shadow-2xl' 
                  : 'scale-90 opacity-50 hover:opacity-80'
              } w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden relative cursor-pointer`}
            >
              <img src={local.img} alt={local.nome} className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0 bg-frevo-blue/10 flex items-center justify-center transition-opacity hover:bg-transparent">
                <span className="text-white font-display font-black text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] px-2">
                  {local.nome}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 bg-white shadow-md border-t-4 border-t-frevo-blue border-x border-b border-frevo-border p-6 rounded-2xl max-w-md mx-auto transition-all duration-300">
          <p className="font-display text-2xl font-black text-frevo-blue">{locais[ativo].nome}</p>
          <p className="text-frevo-muted font-body mt-2 font-medium text-sm">{locais[ativo].desc}</p>
        </div>
      </div>
    </section>
  )
}