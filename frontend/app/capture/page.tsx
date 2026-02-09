"use client";

import {useState} from 'react';
import { motion } from 'framer-motion';

export default function CapturePage(){
    const [form, setForm] = useState({
        title:"",
        content:"",
        type:"note",
        tags:"",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e:any)=>{
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e:any)=>{
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/knowledge`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    title:form.title,
                    content:form.content,
                    type:form.type,
                    tags:form.tags.split(",").map((t)=> t.trim()).filter(Boolean),
                }),
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            setSuccess(true);
            setForm({ title: "", content: "", type: "note", tags: "" });
            
            // Auto-hide success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Error saving knowledge:', error);
            setError('Failed to save knowledge. Please try again.');
        } finally {
            setLoading(false);
        }

    };
    
    return(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Capture Knowledge
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Save your thoughts, links, and insights. AI will process them automatically.
          </p>

          <motion.form 
            onSubmit={handleSubmit} 
            className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Title *
              </label>
              <input
                name="title"
                aria-label="Title"
                placeholder="Give your knowledge a title..."
                value={form.title}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                aria-label="Content"
                placeholder="Write your thought, paste a link, or capture an insight..."
                value={form.content}
                onChange={handleChange}
                rows={8}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none appearance-none"
              >
                <option value="note">📝 Note</option>
                <option value="link">🔗 Link</option>
                <option value="insight">💡 Insight</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tags
              </label>
              <input
                name="tags"
                placeholder="productivity, learning, ideas (comma separated)"
                value={form.tags}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                AI will automatically add more relevant tags
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
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
                  Saving...
                </span>
              ) : (
                "💾 Save Knowledge"
              )}
            </motion.button>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3"
              >
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-green-800 font-semibold">
                    Knowledge saved successfully!
                  </p>
                  <p className="text-green-600 text-sm">
                    AI is processing in the background to summarize and tag your content.
                  </p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3"
              >
                <span className="text-2xl">❌</span>
                <p className="text-red-800">{error}</p>
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </div>       
    )
}
