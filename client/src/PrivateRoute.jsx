import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider'

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" />
    return <Outlet />
}

export default PrivateRoute;