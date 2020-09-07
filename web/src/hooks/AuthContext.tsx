import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthData {
    token: string;
    user: object;
}

interface AuthInterface {
    user: object;
    login(credentials: LoginCredentials): Promise<void>;
    logout(): void;
}

interface LoginCredentials {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthInterface>({} as AuthInterface);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthData>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if(token && user){
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthData;
    });

    const login = useCallback(async ({ email, password }) => {
        const response = await api.post('sections', {
            email,
            password
        });

        const [user, token] = response.data;
        setData({ token, user });

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        setData({} as AuthData);
    }, []);

    return (
        <AuthContext.Provider value={ { user: data.user, login, logout } }>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth():  AuthInterface{
    const context = useContext(AuthContext);

    if(!context)
        throw new Error('useAuth must be used within an AuthProvider.');

    return context;
}