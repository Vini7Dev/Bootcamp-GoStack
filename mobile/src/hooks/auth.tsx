import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthData {
    token: string;
    user: object;
}

interface AuthInterface {
    user: object;
    loading: boolean;
    login(credentials: LoginCredentials): Promise<void>;
    logout(): void;
}

interface LoginCredentials {
    email: string;
    password: string;
}

const AuthContext = createContext<AuthInterface>({} as AuthInterface);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthData>({} as AuthData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            setLoading(true);
            
            const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user']);
    
            if(token[1] && user[1]){
                setData({ token: token[1], user: JSON.parse(user[1]) });
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    const login = useCallback(async ({ email, password }) => {
        const response = await api.post('sections', {
            email,
            password
        });

        const [user, token] = response.data;

        setData({ token, user });

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)]
        ]);
    }, []);

    const logout = useCallback(async () => {
        await AsyncStorage.multiRemove(
            ['@GoBarber:token', '@GoBarber:user']
        );

        setData({} as AuthData);
    }, []);

    return (
        <AuthContext.Provider value={ { user: data.user, loading, login, logout } }>
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