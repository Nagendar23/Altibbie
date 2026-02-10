"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Source = {
  id: string;
  title: string;
  type: string;
};

type QueryResult = {
  question: string;
  answer: string;
  sources: Source[];
  relevantItems?: number;
  totalItems?: number;
};

export default function QueryPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState("");
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);


  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge/query`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ question }),
        }
      );

      if (!response.ok) {
        throw new Error("The AI is experiencing issues. Try again.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const exampleQuestions = [
    "Summarize my thoughts on AI...",
    "What links about design did I save?",
    "Connect my notes on productivity...",
  ];

  if (authLoading || (!user && loading)) return null;

  return (
    <div className="min-h-screen py-32 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30">
            🔮
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Ask Your Brain
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            Retrieve insights from your knowledge base instantly.
          </p>
        </motion.div>

        {/* Query Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 relative z-10"
        >
          <form onSubmit={handleQuery} className="relative">
            <div className="bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 flex items-start focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-400 transition-all duration-300">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                rows={1}
                className="w-full bg-transparent border-0 rounded-2xl px-6 py-4 text-xl font-medium text-slate-900 placeholder:text-slate-400 focus:ring-0 resize-none outline-none leading-normal min-h-[80px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleQuery(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="absolute right-4 top-4 bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-xl">→</span>
                )}
              </button>
            </div>

            {/* Hints */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {exampleQuestions.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuestion(q)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-500 text-sm font-semibold hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all bg-white"
                >
                  {q}
                </button>
              ))}
            </div>
          </form>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold mb-8 border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="space-y-8 pb-20"
            >
              {/* Answer Card */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />

                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  AI Insight
                </h3>

                <div className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-700 font-medium leading-relaxed">
                  {result.answer}
                </div>
              </div>

              {/* Sources */}
              {result.sources && result.sources.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 px-4">
                    Referenced Artifacts
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {result.sources.map((source, i) => (
                      <motion.div
                        key={source.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-4 hover:border-blue-300 hover:shadow-md transition-all group cursor-default"
                      >
                        <span className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 font-bold flex items-center justify-center text-sm group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                          {i + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                            {source.title}
                          </h4>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {source.type}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
