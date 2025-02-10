"use client";
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('There is not AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};