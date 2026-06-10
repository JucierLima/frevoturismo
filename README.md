<p align="center">
  <img src="frontend/src/assets/frevo-logo.png" alt="Logo Frevo Turismo" width="200" />
</p>

<h1 align="center">🎭 Frevo Turismo</h1>

<p align="center">
  Plataforma web de mobilidade e turismo para a Região Metropolitana do Recife.<br>
  Conectamos viajantes a motoristas locais experientes com foco em confiança e experiência cultural.
</p>

---

## 👥 Equipe

Caio Dourado, Eduardo Gomes, Inaldo Alves, Jucier Lima, Matheus Jones

## 🛠️ Tecnologias

- **Frontend:** React.js + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL + Sequelize ORM
- **Autenticação:** JWT + bcryptjs
- **Email:** Nodemailer
- **Deploy frontend:** Vercel
- **Deploy backend:** Render
- **Deploy banco de dados:** Supabase

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL instalado e rodando

### Backend

```bash
cd backend
npm install

# Copia o .env.example e preenche com suas credenciais
cp .env.example .env

npm run seed
npm start
```

### Frontend

```bash
cd frontend
npm install

# Copia o .env.example e preenche com suas credenciais
cp .env.example .env

npm run dev
```

Acessa: `http://localhost:5173`

## 🌟 Funcionalidades

- Rotas turísticas com filtro por categoria e preço fixo
- Perfis detalhados de motoristas (idiomas, especialidades, avaliação)
- Sistema de favoritos para criar rede de contatos locais
- Guia de passeios com dicas de locais
- Solicitação de rotas com confirmação por email
- Autenticação segura com JWT

## 📁 Estrutura do projeto

```plaintext
frevoturismo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── seed.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── services/
```