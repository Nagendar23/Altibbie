"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" ref={containerRef}>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                AI-Powered Knowledge Management
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent leading-tight">
              Your Second Brain
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Capture, organize, and intelligently surface knowledge with the power of AI. 
              Transform scattered thoughts into structured intelligence.
            </p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/capture" 
                className="group relative px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Start Capturing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link 
                href="/dashboard" 
                className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-lg font-semibold text-lg hover:bg-slate-900 hover:text-white transition-all hover:scale-105"
              >
                View Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Background Elements with Parallax */}
        <motion.div
          style={{ y: y1, opacity }}
          animate={{
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 pointer-events-none"
        />
        <motion.div
          style={{ y: y2, opacity }}
          animate={{
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 pointer-events-none"
        />
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900"
          >
            Intelligent Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📝",
                title: "Smart Capture",
                description: "Rich forms for notes, links, and insights with flexible tagging",
              },
              {
                icon: "🤖",
                title: "AI Processing",
                description: "Automatic summarization and intelligent auto-tagging",
              },
              {
                icon: "🔍",
                title: "Smart Search",
                description: "Filter, sort, and discover your knowledge effortlessly",
              },
              {
                icon: "🌐",
                title: "Public API",
                description: "Query your brain from anywhere with our API",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all bg-white"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your Second Brain?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join the future of knowledge management today.
            </p>
            <Link 
              href="/capture" 
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-2xl"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
