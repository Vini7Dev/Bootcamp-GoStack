import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
    addToast(message: Omit<ToastMessageInterf, 'id'>): void;
    removeToast(id: string): void;
}

export interface ToastMessageInterf {
    id: string;
    type?: 'info' | 'success' | 'error';
    title: string;
    description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessageInterf[]>([]);

    const addToast = useCallback(({type, title, description}: Omit<ToastMessageInterf, 'id'>) => {
        const id = uuid();

        const toast = {
            id,
            type,
            title,
            description
        };

        setMessages(oldMessages => [...oldMessages, toast]);
    }, []);

    const removeToast = useCallback((id) => {
        setMessages(oldMessages => oldMessages.filter(message => message.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{addToast, removeToast}}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
}

export function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if(!context)
        throw new Error('useToast must be used within a ToastProvider.');

    return context;
}