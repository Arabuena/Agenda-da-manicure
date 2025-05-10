export const AUTH_CONFIG = {
  username: process.env.REACT_APP_ADMIN_USER || 'admin',
  password: process.env.REACT_APP_ADMIN_PASSWORD || 'senha123',
  tokenKey: 'agenda-card-admin-token',
  tokenValue: process.env.REACT_APP_AUTH_TOKEN || 'token-simulado-123'
}; 