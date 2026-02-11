"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers: any = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
                method: 'GET',
                headers,
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.data);
            } else {
                setUser(null);
                if (res.status === 401) localStorage.removeItem('token'); // Clear invalid token
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login
    const login = async (user: any, token: string) => {
        if (token) {
            localStorage.setItem('token', token);
        }
        setUser(user);
        router.push("/dashboard");
    };

    // Register
    const register = async (user: any, token: string) => {
        if (token) {
            localStorage.setItem('token', token);
        }
        setUser(user);
        router.push("/dashboard");
    };

    // Logout
    const logout = async () => {
        setUser(null);
        Cookies.remove("token");
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
