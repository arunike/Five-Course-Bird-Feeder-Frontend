import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactElement;
    requiresAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiresAdmin = false }) => {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (!username) {
        return <Navigate to="/login" replace />;
    }

    if (requiresAdmin && role !== 'admin') {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;
