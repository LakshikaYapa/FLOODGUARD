import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center p-10 text-slate-400">Loading...</div>;
  }

  // check if the user is an admin
  const isAdmin = user && (user.role === 'admin' || (user.roles && user.roles.includes('admin')));

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;