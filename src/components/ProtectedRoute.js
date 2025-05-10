import { Navigate } from 'react-router-dom';
import { AUTH_CONFIG } from '../config/auth';

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
  const isAuthenticated = token === AUTH_CONFIG.tokenValue;

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
} 