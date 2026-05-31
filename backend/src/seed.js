require('dotenv').config()
const { sequelize, Motorista, Passeio } = require('./models')

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

    await Motorista.bulkCreate(motoristas)
    console.log('✅ Motoristas criados')

    await Passeio.bulkCreate(passeios)
    console.log('✅ Passeios criados')

    console.log('🎉 Seed concluído com sucesso!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Erro no seed:', err)
    process.exit(1)
  }
}

seed()