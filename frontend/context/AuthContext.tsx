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
        // Check if token exists in cookies (set by backend or frontend)
        // Since we're using httpOnly cookie for security primarily, we might need a /me endpoint that checks the cookie
        // But for this simple implementation, let's try to hit /me

        try {
            // If we have a token in localStorage (optional hybrid approach) or just rely on cookie
            // Let's rely on the cookie being there.
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization header might be needed if we aren't using cookies for this specific call or if using Bearer
                    // But our backend checks both. Let's start with just credentials: include
                },
                credentials: 'include' // Important for cookies
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login
    const login = async (user: any) => {
        setUser(user);
        router.push("/dashboard");
    };

    // Register
    const register = async (user: any) => {
        setUser(user);
        router.push("/dashboard");
    };

    // Logout
    const logout = async () => {
        // Call logout endpoint if exists, or just clear local state and redirect
        // For now, simple state clear. In real app, hit /api/auth/logout to clear cookie
        setUser(null);
        Cookies.remove("token"); // If we were setting it client side too
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
