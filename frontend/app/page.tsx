"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax for background blobs
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50" ref={containerRef}>

      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 -left-20 w-[600px] h-[600px] bg-violet-400/20 rounded-full blur-3xl opacity-50"
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-sm tracking-wide">
              ✨ AI-Powered Knowledge Management
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              Your Second <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Brain Awaits.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium mb-10 max-w-lg leading-relaxed">
              Capture intelligent notes, link ideas automatically, and let AI surface the connections you missed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary text-lg px-8 py-4">
                Start Capturing →
              </Link>
              <Link href="/query" className="px-8 py-4 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                Ask AI →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* 3D-ish Glass Cards Visual */}
            <div className="relative w-full aspect-square perspective-1000">
              <motion.div
                initial={{ rotateY: -10, rotateX: 5 }}
                animate={{ rotateY: -5, rotateX: 2 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
                className="absolute top-10 right-10 w-72 h-96 bg-white/80 backdrop-blur-xl rounded-3xl z-10 shadow-2xl border border-white/50 p-6 transform"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">💡</div>
                <div className="h-4 w-3/4 bg-slate-100 rounded-full mb-3" />
                <div className="h-4 w-1/2 bg-slate-100 rounded-full mb-6" />
                <div className="space-y-3">
                  <div className="h-20 bg-slate-50 rounded-xl border border-slate-100" />
                  <div className="h-20 bg-slate-50 rounded-xl border border-slate-100" />
                </div>
              </motion.div>

              <motion.div
                initial={{ rotateY: 10, rotateX: -5 }}
                animate={{ rotateY: 5, rotateX: -2 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 6 }}
                className="absolute bottom-20 left-20 w-80 h-64 bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl z-20 shadow-2xl p-8 flex flex-col justify-center text-white"
              >
                <div className="text-5xl font-bold mb-2">10k+</div>
                <div className="text-blue-100 font-medium">Notes Captured</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-32 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-500">Transform chaos into structure in seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Capture", desc: "Instantly save notes, links, and ideas from anywhere.", icon: "⚡", color: "text-amber-500", bg: "bg-amber-50" },
              { title: "Connect", desc: "AI automatically tags and links related concepts.", icon: "🔗", color: "text-blue-500", bg: "bg-blue-50" },
              { title: "Query", desc: "Ask your brain questions and get intelligent answers.", icon: "🤖", color: "text-violet-500", bg: "bg-violet-50" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee/Pills Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">remember.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Research Notes', 'Journaling', 'Bookmarks', 'Code Snippets', 'Meeting Minutes', 'Project Ideas'].map((tag) => (
              <div key={tag} className="px-6 py-3 rounded-full border border-slate-700 bg-slate-800/50 font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-default">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 md:p-20 bg-gradient-to-r from-blue-600 to-violet-600 rounded-[3rem] relative overflow-hidden shadow-2xl text-white">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to upgrade your mind?
              </h2>
              <p className="text-xl text-blue-100 font-medium mb-10 max-w-xl mx-auto">
                Join thousands of thinkers building their personal knowledge base.
              </p>
              <Link href="/register" className="inline-block bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-blue-50 hover:shadow-lg transition-all">
                Get Started for Free
              </Link>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
