import { createContext, useState, useEffect } from 'react';

// 1. Water Tank create panrom
export const AuthContext = createContext();

// 2. Tank-a supply panra Main Pipe (Provider)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initial-a user illai (null)
    const [loading, setLoading] = useState(true);

    // App load aagum pothu, aagave login pannirukangala nu check panrom
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // LocalStorage-la iruntha eduthu set panrom
        }
        setLoading(false);
    }, []);

    // Login function (Token & User details-a save panna)
    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    // Logout function (Ellathayum azhichidalam)
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};