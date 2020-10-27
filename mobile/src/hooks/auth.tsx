import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

interface AuthData {
    token: string;
    user: User;
}

interface AuthInterface {
    user: User;
    loading: boolean;
    login(credentials: LoginCredentials): Promise<void>;
    logout(): void;
    updateUser(user: User): Promise<void>;
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
                api.defaults.headers.authorization = `Bearer ${token}`;
                
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

        const {user, token} = response.data;

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)]
        ]);

        api.defaults.headers.authorization = `Bearer ${token}`;
        
        setData({ token, user });
    }, []);

    const logout = useCallback(async () => {
        await AsyncStorage.multiRemove(
            ['@GoBarber:token', '@GoBarber:user']
        );

        setData({} as AuthData);
    }, []);
    
    const updateUser = useCallback(async (user: User) => {
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({
            token: data.token,
            user
        });
    }, [setData, data.token]);

    return (
        <AuthContext.Provider value={ { user: data.user, loading, login, logout, updateUser } }>
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