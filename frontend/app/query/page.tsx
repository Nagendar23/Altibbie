"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          body: JSON.stringify({ question }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to query knowledge base");
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
    "What are my main insights about productivity?",
    "Summarize my notes about AI",
    "What links have I saved recently?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Ask Your Second Brain
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Query your knowledge base conversationally using AI
          </p>

          {/* Query Form */}
          <form onSubmit={handleQuery} className="mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-1">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about your knowledge..."
                aria-label="Ask a question about your knowledge"
                rows={4}
                className="w-full bg-slate-50 border-0 rounded-xl px-6 py-4 text-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-0 transition-colors resize-none"
                disabled={loading}
              />
              
              <div className="flex items-center justify-between px-6 pb-4 bg-white rounded-b-xl border-t border-slate-100 mt-2 pt-3">
                <div className="text-sm text-slate-400 font-medium">
                  Try asking about your notes, links, or insights
                </div>
                <button
                  type="submit"
                  aria-label="Submit Question"
                  disabled={loading || !question.trim()}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Thinking...
                    </span>
                  ) : (
                    "Ask Question"
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Example Questions */}
          <div className="mb-8">
            <p className="text-sm font-medium text-slate-700 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-3">
              {exampleQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuestion(q)}
                  className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg text-sm hover:border-blue-400 hover:text-blue-600 transition-all"
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-8"
              >
                <p className="text-red-800">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Answer
                  </h2>
                  <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                    {result.answer}
                  </div>
                </div>

                {result.sources && result.sources.length > 0 && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Sources ({result.sources.length})
                    </h3>
                    <div className="grid gap-3">
                      {result.sources.map((source, idx) => (
                        <div
                          key={source.id}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">
                              {source.title}
                            </p>
                            <p className="text-sm text-slate-500 uppercase">
                              {source.type}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.relevantItems !== undefined && (
                  <div className="mt-4 text-sm text-slate-500">
                    Found {result.relevantItems} relevant items out of {result.totalItems} total
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
