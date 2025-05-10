import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backgroundUrls } from '../config/constants';
import { AUTH_CONFIG } from '../config/auth';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backgrounds, setBackgrounds] = useState([]);
  const [popups, setPopups] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
    if (token !== AUTH_CONFIG.tokenValue) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      loadBackgrounds();
      loadPopups();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === AUTH_CONFIG.username && password === AUTH_CONFIG.password) {
      localStorage.setItem(AUTH_CONFIG.tokenKey, AUTH_CONFIG.tokenValue);
      setIsAuthenticated(true);
    } else {
      alert('Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aqui você implementaria o upload real para o Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      // Simular upload
      setBackgrounds(prev => [...prev, {
        id: Date.now(),
        src: URL.createObjectURL(file),
        alt: file.name
      }]);
    }
  };

  const handleDeleteBackground = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta imagem?')) {
      setBackgrounds(prev => prev.filter(bg => bg.id !== id));
    }
  };

  const loadBackgrounds = async () => {
    // Por enquanto, vamos carregar os backgrounds do array global
    setBackgrounds(backgroundUrls.map((bg, index) => ({
      id: index,
      ...bg
    })));
  };

  const loadPopups = async () => {
    // Implementar depois quando tivermos popups
    setPopups([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center">Login Administrativo</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        {/* Gerenciamento de Backgrounds */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow">
          <h2 className="text-xl font-semibold mb-4">Gerenciar Backgrounds</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          <div className="grid grid-cols-3 gap-4">
            {backgrounds.map(bg => (
              <div key={bg.id} className="relative">
                <img
                  src={bg.src}
                  alt={bg.alt}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  onClick={() => handleDeleteBackground(bg.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gerenciamento de Popups */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Gerenciar Popups</h2>
          {/* Implementar gerenciamento de popups similar aos backgrounds */}
        </div>
      </div>
    </div>
  );
} 