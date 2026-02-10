"use client";

import { useEffect, useState } from "react";
import KnowledgeList from "./knowledgeList";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null; // Should redirect

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {user.name}'s Brain
            </h1>
            <p className="text-xl text-slate-600">
              Explore your collection of knowledge, insights, and saved links
            </p>
          </div>
          <button
            onClick={() => router.push('/capture')}
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
          >
            + Capture New
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="mt-4 text-slate-600">Loading your knowledge...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && <KnowledgeList items={items} />}
      </div>
    </div>
  );
}
