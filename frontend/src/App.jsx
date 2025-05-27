import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import InicioPage from './pages/InicioPage'; // 👈 NUEVO
import ProductosPage from './pages/ProductosPage';
import UsuariosPage from './pages/UsuariosPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('modo') === 'oscuro';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('modo', 'oscuro');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('modo', 'claro');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="container mt-4 position-relative">
        <button
          className="btn btn-sm btn-outline-dark btn-toggle-dark"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
        </button>

        <h1 className="mb-4">🛒 App Fullstack</h1>
        <nav className="mb-4">
          <Link to="/usuarios" className="btn btn-primary me-2">Usuarios</Link>
          <Link to="/productos" className="btn btn-secondary">Productos</Link>
        </nav>

        <Routes>
          <Route path="/" element={<InicioPage />} /> {/* 👈 NUEVA RUTA */}
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/productos" element={<ProductosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
