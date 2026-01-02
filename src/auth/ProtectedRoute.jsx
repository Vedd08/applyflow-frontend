import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  // Not logged in → go to Home (not login)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but wrong role
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
