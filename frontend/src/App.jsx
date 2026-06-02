import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Motoristas from './pages/Motoristas'
import MotoristaDetalhe from './pages/MotoristaDetalhe'
import Rotas from './pages/Rotas'
import RotaDetalhe from './pages/RotaDetalhe'
import Passeios from './pages/Passeios'
import PasseioDetalhe from './pages/PasseioDetalhe'
import Favoritos from './pages/Favoritos'
import Perfil from './pages/Perfil'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/motoristas" element={<Motoristas />} />
              <Route path="/motoristas/:id" element={<MotoristaDetalhe />} />
              <Route path="/rotas" element={<Rotas />} />
              <Route path="/rotas/:id" element={<RotaDetalhe />} />
              <Route path="/passeios" element={<Passeios />} />
              <Route path="/passeios/:id" element={<PasseioDetalhe />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App