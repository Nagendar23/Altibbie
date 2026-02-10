"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            await login(data.user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-3xl relative z-10 shadow-2xl border border-white/50"
            >
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg shadow-blue-500/30">✦</div>
                    <h2 className="text-3xl font-bold text-slate-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-slate-500 font-medium">
                        Enter your digital sanctuary.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="input-field w-full"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="input-field w-full"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="text-red-600 text-sm font-medium text-center bg-red-50 p-3 rounded-xl border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary"
                    >
                        {loading ? "Unlocking..." : "Sign In"}
                    </button>

                    <div className="text-center mt-6">
                        <Link
                            href="/register"
                            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            New here? <span className="text-blue-600 hover:underline">Create an account</span>
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
