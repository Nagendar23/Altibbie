"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard", protected: true },
    { href: "/capture", label: "Capture", protected: true },
    { href: "/query", label: "Ask AI", protected: true },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-slate-200/50 border border-white/50"
        >
          {/* Logo */}
          <Link href="/" aria-label="Home" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2 group">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm group-hover:rotate-12 transition-transform duration-300 shadow-md shadow-blue-500/30">✦</span>
            <span>SecondBrain</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full">
            {navItems.map((item) => {
              if (item.protected && !user) return null;

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-5 py-2 text-sm font-semibold transition-all rounded-full"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white shadow-sm rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <span className="text-sm font-semibold text-slate-700 hidden sm:block">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-600 hover:text-red-500"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
