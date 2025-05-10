export const AUTH_CONFIG = {
  username: process.env.REACT_APP_ADMIN_USER || 'admin',
  password: process.env.REACT_APP_ADMIN_PASSWORD || 'senha123',
  tokenKey: 'agenda-card-admin-token',
  tokenValue: process.env.REACT_APP_AUTH_TOKEN || 'token-simulado-123'
};

// Credenciais de acesso ao admin
export const adminCredentials = {
  username: 'admin',
  password: 'admin123' // Em produção, use uma senha mais segura
};

// Função para verificar autenticação
export const isAuthenticated = () => {
  const token = localStorage.getItem('admin_token');
  return !!token;
};

// Função para fazer login
export const login = (username, password) => {
  if (username === adminCredentials.username && password === adminCredentials.password) {
    const token = Math.random().toString(36).substring(7);
    localStorage.setItem('admin_token', token);
    return true;
  }
  return false;
};

// Função para fazer logout
export const logout = () => {
  localStorage.removeItem('admin_token');
}; 