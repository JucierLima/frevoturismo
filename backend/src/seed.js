require('dotenv').config()
const { sequelize, Motorista, Passeio, Rota } = require('./models')

const motoristas = [
  {
    name: 'Carlos Ferreira',
    bio: 'Recifense de nascença, apaixonado pela história de Pernambuco. Guia turístico certificado com 10 anos de experiência.',
    idiomas: ['Português', 'Inglês', 'Espanhol'],
    especialidades: ['Centro Histórico', 'Olinda', 'Gastronomia'],
    avaliacao: 4.9,
    totalViagens: 312,
    telefone: '(81) 99999-1111',
  },
  {
    name: 'Ana Lima',
    bio: 'Bióloga e guia especializada em ecoturismo e turismo de natureza na RMR.',
    idiomas: ['Português', 'Inglês'],
    especialidades: ['Capibaribe', 'Manguezais', 'Ecoturismo'],
    avaliacao: 4.8,
    totalViagens: 198,
    telefone: '(81) 99999-2222',
  },
  {
    name: 'Roberto Santos',
    bio: 'Motorista experiente e historiador amador, especialista em cultura popular pernambucana.',
    idiomas: ['Português'],
    especialidades: ['Frevo', 'Maracatu', 'Museus'],
    avaliacao: 4.7,
    totalViagens: 245,
    telefone: '(81) 99999-3333',
  },
  {
    name: 'Fernanda Oliveira',
    bio: 'Chef e guia gastronômica, leva turistas aos melhores sabores do Recife.',
    idiomas: ['Português', 'Francês'],
    especialidades: ['Gastronomia', 'Mercado de São José', 'Recife Antigo'],
    avaliacao: 5.0,
    totalViagens: 156,
    telefone: '(81) 99999-4444',
  },
  {
    name: 'Pedro Alves',
    bio: 'Surfista e guia especializado nas praias da região metropolitana.',
    idiomas: ['Português', 'Inglês'],
    especialidades: ['Praias', 'Porto de Galinhas', 'Esportes Aquáticos'],
    avaliacao: 4.6,
    totalViagens: 289,
    telefone: '(81) 99999-5555',
  },
]

const passeios = [
  {
    titulo: 'Recife Antigo e Marco Zero',
    descricao: 'Passeio pelo coração histórico do Recife, visitando o Marco Zero, Paço do Frevo e o Bairro do Recife.',
    local: 'Recife Antigo',
    categoria: 'historia',
    preco: 0,
    dica: 'Vá de manhã cedo para evitar o calor e aproveite a feira de artesanato aos finais de semana.',
  },
  {
    titulo: 'Centro Histórico de Olinda',
    descricao: 'Patrimônio da Humanidade pela UNESCO, Olinda encanta com suas igrejas barrocas e casarios coloridos.',
    local: 'Olinda',
    categoria: 'cultura',
    preco: 0,
    dica: 'Use tênis confortável, as ruas são de paralelepípedo e têm bastante subida.',
  },
  {
    titulo: 'Praia de Boa Viagem',
    descricao: 'A mais famosa praia do Recife, com orla movimentada, restaurantes e vida noturna.',
    local: 'Boa Viagem',
    categoria: 'praia',
    preco: 0,
    dica: 'Tome cuidado com a sinalização de tubarões e só nade até a primeira fileira de recifes.',
  },
  {
    titulo: 'Mercado de São José',
    descricao: 'O mercado mais antigo do Brasil, cheio de especiarias, artesanato e a essência da cultura nordestina.',
    local: 'São José, Recife',
    categoria: 'gastronomia',
    preco: 0,
    dica: 'Experimente o tapioca e o suco de caju fresquinho. Vá de manhã para ver o mercado mais movimentado.',
  },
  {
    titulo: 'Instituto Ricardo Brennand',
    descricao: 'Um dos maiores acervos de arte do Brasil, com castelo medieval, jardins e coleção de Frans Post.',
    local: 'Várzea, Recife',
    categoria: 'cultura',
    preco: 20,
    dica: 'Reserve pelo menos 3 horas. Os jardins sozinhos já valem a visita.',
  },
]

const seed = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log('✅ Banco limpo e sincronizado')

    const motoristsCriados = await Motorista.bulkCreate(motoristas)
    console.log('✅ Motoristas criados')

    await Passeio.bulkCreate(passeios)
    console.log('✅ Passeios criados')

    const rotas = [
      {
        titulo: 'Rota Histórica do Recife Antigo',
        descricao: 'Percorra os principais pontos históricos do Recife, do Marco Zero ao Paço do Frevo, passando pelo Bairro do Recife e seus casarões coloniais.',
        duracao: '4 horas',
        preco: 120,
        categoria: 'historia',
        motoristaId: motoristsCriados[0].id,
        pontos: [
          { nome: 'Marco Zero', lat: -8.0631, lng: -34.8711 },
          { nome: 'Paço do Frevo', lat: -8.0628, lng: -34.8717 },
          { nome: 'Embaixada dos Bonecos Gigantes', lat: -8.0622, lng: -34.8730 },
          { nome: 'Praça do Arsenal', lat: -8.0618, lng: -34.8724 },
        ],
      },
      {
        titulo: 'Tour Gastronômico pelo Recife',
        descricao: 'Uma viagem pelos sabores autênticos do Recife: do Mercado de São José às tapiocas da Rua da Moeda, terminando nos restaurantes do Pátio de São Pedro.',
        duracao: '5 horas',
        preco: 150,
        categoria: 'gastronomia',
        motoristaId: motoristsCriados[3].id,
        pontos: [
          { nome: 'Mercado de São José', lat: -8.0641, lng: -34.8785 },
          { nome: 'Rua da Moeda', lat: -8.0630, lng: -34.8740 },
          { nome: 'Pátio de São Pedro', lat: -8.0647, lng: -34.8795 },
        ],
      },
      {
        titulo: 'Rota das Praias da RMR',
        descricao: 'Conheça as melhores praias da Região Metropolitana do Recife, de Boa Viagem a Porto de Galinhas.',
        duracao: '8 horas',
        preco: 200,
        categoria: 'praias',
        motoristaId: motoristsCriados[4].id,
        pontos: [
          { nome: 'Praia de Boa Viagem', lat: -8.1181, lng: -34.8997 },
          { nome: 'Praia de Piedade', lat: -8.1712, lng: -34.9104 },
          { nome: 'Porto de Galinhas', lat: -8.5042, lng: -35.0044 },
        ],
      },
      {
        titulo: 'Olinda Patrimônio Mundial',
        descricao: 'Explore o centro histórico de Olinda, Patrimônio da Humanidade pela UNESCO, com suas igrejas barrocas e ateliês de artistas locais.',
        duracao: '3 horas',
        preco: 90,
        categoria: 'cultural',
        motoristaId: motoristsCriados[0].id,
        pontos: [
          { nome: 'Praça do Carmo', lat: -7.9998, lng: -34.8494 },
          { nome: 'Igreja da Sé', lat: -8.0013, lng: -34.8482 },
          { nome: 'Alto da Sé', lat: -8.0015, lng: -34.8480 },
        ],
      },
      {
        titulo: 'Ecoturismo no Capibaribe',
        descricao: 'Uma jornada pelo Rio Capibaribe e seus manguezais, descobrindo a biodiversidade única do ecossistema recifense.',
        duracao: '4 horas',
        preco: 110,
        categoria: 'natureza',
        motoristaId: motoristsCriados[1].id,
        pontos: [
          { nome: 'Parque de Dois Irmãos', lat: -7.9989, lng: -34.9402 },
          { nome: 'Manguezal do Pina', lat: -8.1012, lng: -34.8998 },
          { nome: 'Jardim Botânico', lat: -8.0441, lng: -34.9501 },
        ],
      },
    ]

    await Rota.bulkCreate(rotas)
    console.log('✅ Rotas criadas')

    console.log('🎉 Seed concluído com sucesso!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Erro no seed:', err)
    process.exit(1)
  }
}

seed()