import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  requiredRole: 'ADMIN' | 'USER';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Wait until loading state is resolved

    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    if (userRole !== requiredRole) {
      navigate('/unauthorized');
      return;
    }
  }, [isAuthenticated, userRole, loading, navigate, requiredRole]);

  // Render nothing while redirecting
  if (loading || !isAuthenticated || userRole !== requiredRole) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
