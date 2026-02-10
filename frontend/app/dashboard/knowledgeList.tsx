"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Types ---------- */

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

type KnowledgeListProps = {
  items?: KnowledgeItem[];
};

/* ---------- Component ---------- */

export default function KnowledgeList({ items = [] }: KnowledgeListProps) {
  const [localItems, setLocalItems] = useState<KnowledgeItem[]>(items);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | KnowledgeItem["type"]>("all");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedItem]);

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Delete this item? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (res.ok) {
        setLocalItems(prev => prev.filter(item => item._id !== id));
        if (selectedItem?._id === id) setSelectedItem(null);
      } else {
        alert("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error removing item");
    } finally {
      setDeletingId(null);
    }
  };

  const safeItems = Array.isArray(localItems) ? localItems : [];

  const filtered = safeItems.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    const matchesType = type === "all" || item.type === type;
    return matchesQuery && matchesType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const typeConfig = {
    note: { bg: "bg-blue-100", text: "text-blue-700", icon: "📝" },
    link: { bg: "bg-purple-100", text: "text-purple-700", icon: "🔗" },
    insight: { bg: "bg-amber-100", text: "text-amber-700", icon: "💡" },
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const extractUrl = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = content.match(urlRegex);
    return match ? match[0] : null;
  };

  return (
    <>
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-slate-200 sticky top-24 z-30"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {(["all", "note", "link", "insight"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all whitespace-nowrap ${type === t
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        <AnimatePresence mode="popLayout">
          {sorted.map((item, index) => {
            const config = typeConfig[item.type];
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                layout
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-2xl border border-slate-200 p-6 cursor-pointer relative overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${config.bg} ${config.text} uppercase tracking-wider`}>
                    {item.type}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{formatDate(item.createdAt)}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {item.content}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {item.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-slate-50 text-slate-500 px-2 py-1 rounded-md font-semibold border border-slate-200">#{tag}</span>
                  ))}
                </div>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleDelete(item._id, e)}
                    className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-colors text-slate-400 shadow-sm"
                  >
                    {deletingId === item._id ? "..." : "×"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 pb-0 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{typeConfig[selectedItem.type].icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                        {selectedItem.title}
                      </h2>
                      <p className="text-sm text-slate-500 font-medium">{formatDate(selectedItem.createdAt)}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {selectedItem.ai?.summary && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8 border border-blue-100">
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span>🤖</span> AI Summary
                    </h4>
                    <p className="text-slate-700 font-medium leading-relaxed">{selectedItem.ai.summary}</p>
                  </div>
                )}

                <div className="prose prose-slate prose-lg max-w-none text-slate-600 mb-8">
                  {selectedItem.content}
                </div>

                {selectedItem.type === "link" && extractUrl(selectedItem.content) && (
                  <div className="mb-8">
                    <a
                      href={extractUrl(selectedItem.content)!}
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                    >
                      Open Link ↗
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-6 border-t border-slate-100 mt-auto flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  {selectedItem.tags?.map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-600">#{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(selectedItem._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
