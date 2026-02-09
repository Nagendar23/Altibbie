"use client";

import { useState } from "react";

/* ---------- Types ---------- */

type KnowledgeItem = {
  _id: string;
  title: string;
  content: string;
  type: "note" | "link" | "insight";
  tags?: string[];
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

  const safeItems = Array.isArray(items) ? items : [];

  const filtered = safeItems.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase());

    const matchesType = type === "all" || item.type === type;

    return matchesQuery && matchesType;
  });

  return (
    <>
      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search knowledge..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
        />

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as "all" | KnowledgeItem["type"])
          }
          className="border rounded px-4 py-2"
        >
          <option value="all">All</option>
          <option value="note">Notes</option>
          <option value="link">Links</option>
          <option value="insight">Insights</option>
        </select>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 hover:shadow-sm transition"
          >
            <div className="text-sm text-gray-500 mb-1">
              {item.type.toUpperCase()}
            </div>

            <h2 className="font-semibold mb-2">{item.title}</h2>

            <p className="text-sm text-gray-700 mb-3 line-clamp-3">
              {item.ai?.summary ?? item.content}
            </p>

            <div className="flex flex-wrap gap-2">
              {(item.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 mt-8">No knowledge found.</p>
      )}
    </>
  );
}
