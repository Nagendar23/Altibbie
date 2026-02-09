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
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | KnowledgeItem["type"]>("all");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);

  // Handle body scroll when modal is open
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

  const safeItems = Array.isArray(items) ? items : [];

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

  const typeIcons = {
    note: "📝",
    link: "🔗",
    insight: "💡",
  };

  const typeGradients = {
    note: "from-blue-50 via-blue-100 to-indigo-50",
    link: "from-purple-50 via-purple-100 to-pink-50",
    insight: "from-amber-50 via-yellow-100 to-orange-50",
  };

  const typeBorders = {
    note: "border-blue-200 hover:border-blue-400",
    link: "border-purple-200 hover:border-purple-400",
    insight: "border-amber-200 hover:border-amber-400",
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              placeholder="🔍 Search your knowledge..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
            />
          </div>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "all" | KnowledgeItem["type"])
            }
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="note">📝 Notes</option>
            <option value="link">🔗 Links</option>
            <option value="insight">💡 Insights</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "title")}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none cursor-pointer"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>Showing <strong>{sorted.length}</strong> of <strong>{safeItems.length}</strong> items</span>
          {(query || type !== 'all') && (
             <span className="text-blue-600 font-medium">Filtered results</span>
          )}
        </div>
      </motion.div>

      {/* List */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((item, index) => {
            const url = item.type === "link" ? extractUrl(item.content) : null;
            
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                onClick={() => setSelectedItem(item)}
                className={`bg-gradient-to-br ${typeGradients[item.type]} border-2 ${typeBorders[item.type]} rounded-2xl p-6 hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative group`}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                      {typeIcons[item.type]}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-bold px-3 py-1.5 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full uppercase tracking-wider shadow-sm">
                        {item.type}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-bold text-xl mb-3 text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h2>

                  {item.ai?.summary && (
                    <div className="mb-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/80">
                      <p className="text-xs font-semibold text-purple-700 mb-1">🤖 AI Summary</p>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        {item.ai.summary}
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {item.content}
                  </p>

                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold mb-3 hover:underline group/link"
                    >
                      <span>🌐 Visit Link</span>
                      <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}

                  {(item.tags && item.tags.length > 0) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-white/70 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full font-medium border border-slate-200 shadow-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-xs text-slate-500 font-semibold px-3 py-1">
                          +{item.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full mt-4 pt-4 border-t border-white/30 text-blue-600 hover:text-blue-700 font-semibold text-sm py-2 hover:bg-white/10 rounded-b-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>View Full Details</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 top-0 left-0 right-0 bottom-0"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className={`bg-gradient-to-br ${typeGradients[selectedItem.type]} rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 ${typeBorders[selectedItem.type]}`}
              >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 p-6 flex items-start justify-between z-10">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-5xl">{typeIcons[selectedItem.type]}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full uppercase tracking-wider">
                        {selectedItem.type}
                      </span>
                      <span className="text-sm text-slate-500 font-medium">
                        {formatDate(selectedItem.createdAt)}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">
                      {selectedItem.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* AI Summary */}
                {selectedItem.ai?.summary && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-5 border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🤖</span>
                      <h3 className="text-lg font-bold text-purple-900">AI-Generated Summary</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedItem.ai.summary}
                    </p>
                  </div>
                )}

                {/* Full Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Full Content</h3>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedItem.content}
                  </p>
                </div>

                {/* Link for link type */}
                {selectedItem.type === "link" && extractUrl(selectedItem.content) && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">🔗 Link</h3>
                    <a
                      href={extractUrl(selectedItem.content)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-semibold break-all hover:underline inline-flex items-center gap-2 group"
                    >
                      <span>{extractUrl(selectedItem.content)}</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Tags */}
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">🏷️ Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-4 py-2 rounded-full font-medium border border-blue-200 shadow-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">📊 Metadata</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500 font-medium">Type:</span>
                      <span className="ml-2 text-slate-900 font-semibold capitalize">{selectedItem.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Created:</span>
                      <span className="ml-2 text-slate-900 font-semibold">{formatDate(selectedItem.createdAt)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">ID:</span>
                      <span className="ml-2 text-slate-900 font-mono text-xs">{selectedItem._id}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Tags:</span>
                      <span className="ml-2 text-slate-900 font-semibold">{selectedItem.tags?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {sorted.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-slate-500 mb-2">No knowledge found</p>
          <p className="text-slate-400">
            {query || type !== "all" 
              ? "Try adjusting your filters" 
              : "Start capturing your thoughts and ideas"}
          </p>
        </motion.div>
      )}
    </>
  );
}
