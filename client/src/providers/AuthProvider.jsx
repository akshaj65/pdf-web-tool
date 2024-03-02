import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import { useContext, createContext } from 'react';
import swal from 'sweetalert';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_SERVER_URL;

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuth') || false);

    //check local storage when compnent mounts
    // useEffect(() => {
    //     const storedAuthStatus = localStorage.getItem('isAuth');
    //     if (storedAuthStatus) {
    //         setIsAuthenticated(JSON.parse(storedAuthStatus));
    //     }
    // }, []);


    // Update localStorage whenever isAuthenticated changes
    useEffect(() => {
        localStorage.setItem('isAuth', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);




    const register = useCallback(async args => {
        try {
            const res = await fetch(`${API_URL}/api/v1/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                }),
            });

            const { success, message, user } = await res.json();
            setIsAuthenticated(success);
            if (!success) throw new Error(message);
            setUser(user);
        } catch (e) {
            setIsAuthenticated(false);
            throw new Error(e.message);
        }
    }, []);

    const login = useCallback(async args => {
        try {
            const res = await fetch(`${API_URL}/api/v1/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: args.email,
                    password: args.password,
                }),
            });
            const { success, message, user } = await res.json();
            setIsAuthenticated(success);
            if (!success) throw new Error(message);
            setUser(user);

        } catch (e) {
            setIsAuthenticated(false);
            throw new Error(e.message);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/v1/auth/logout`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                setUser(null);
                setIsAuthenticated(false);
            } else {
                throw new Error('An error occurred while attempting to logout.')
            }
        } catch (e) {
            throw new Error('An error occurred while attempting to logout.')
        }
    }, []);

    const fetchMe = async () => {
        try {
            const res = await fetch(`${API_URL}/api/v1/auth/me`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { success, message, user } = await res.json();
            setIsAuthenticated(success);
            if (!success) {
                await swal({
                    text: message,
                    icon: "error"
                });
            }

            setUser(user);

        } catch (e) {
            setIsAuthenticated(false);
            console.log(e);
            await swal({
                text: e.message,
                icon: "error"

            });
        }
    }


    useEffect(() => {
        fetchMe();
    }, [])


    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                login,
                logout,
                fetchMe,
                isAuthenticated
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}