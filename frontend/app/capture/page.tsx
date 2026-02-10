"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CapturePage() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "note",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: form.title,
            content: form.content,
            type: form.type,
            tags: form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      setSuccess(true);
      setForm({ title: "", content: "", type: "note", tags: "" });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error saving knowledge:", error);
      setError("Failed to save. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || (!user && loading)) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" /></div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen py-32 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Capture.
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              Store it now. Let AI connect to it later.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 space-y-8 relative overflow-hidden border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="space-y-6">
              <div>
                <input
                  name="title"
                  placeholder="Untitled Idea..."
                  value={form.title}
                  onChange={handleChange}
                  className="w-full bg-transparent text-3xl md:text-4xl font-bold text-slate-900 placeholder:text-slate-300 outline-none border-b-2 border-slate-100 focus:border-blue-500 transition-colors pb-4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Type</label>
                  <div className="relative">
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full bg-slate-50 rounded-xl px-4 py-3 font-semibold text-slate-700 appearance-none cursor-pointer hover:bg-slate-100 transition-colors outline-none border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    >
                      <option value="note">Note</option>
                      <option value="link">Link</option>
                      <option value="insight">Insight</option>
                    </select>
                    <span className="absolute right-4 top-3.5 pointer-events-none text-slate-400">▼</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tags</label>
                  <input
                    name="tags"
                    placeholder="tech, future, design"
                    value={form.tags}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Content</label>
                <textarea
                  name="content"
                  placeholder="What's on your mind?"
                  value={form.content}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-lg text-slate-700 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-medium leading-relaxed"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <AnimatePresence>
                {success && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-600 font-bold flex items-center gap-2"
                  >
                    <span>✓</span> Saved to archive
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Artifact"}
              </button>
            </div>

            {error && <p className="text-red-600 font-bold text-center bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
