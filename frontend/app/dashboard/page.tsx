"use client";

import { useEffect, useState } from "react";
import KnowledgeList from "./knowledgeList";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type KnowledgeItem = {
  _id: string;
  title: string;
  content: string;
  type: "note" | "link" | "insight";
  tags?: string[];
  createdAt?: string;
  ai?: {
    summary?: string;
  };
};

export default function DashboardPage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchKnowledge = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge`,
          { cache: "no-store", credentials: "include" }
        );

        if (!res.ok) {
          setError('Failed to fetch knowledge items');
          setItems([]);
          return;
        }

        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error('Error fetching knowledge:', err);
        setError('Error loading knowledge. Please refresh.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledge();
  }, [user]);

  if (authLoading || (!user && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              {user.name}'s Library
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-lg">
              Your personal knowledge collection.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push('/capture')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2 group"
          >
            <span className="text-lg">＋</span>
            <span>Capture New</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
          </motion.button>
        </div>

        {loading && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium">Loading contents...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-10 text-red-800 font-medium">
            {error}
          </div>
        )}

        {!loading && <KnowledgeList items={items} />}
      </div>
    </div>
  );
}
