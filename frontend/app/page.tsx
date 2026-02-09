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

  const stats = [
    { value: "10K+", label: "Users Managing Knowledge", delay: 0 },
    { value: "1M+", label: "Items Captured", delay: 0.1 },
    { value: "99.9%", label: "Uptime", delay: 0.2 },
    { value: "500ms", label: "Search Speed", delay: 0.3 },
  ];

  const features = [
    { icon: "📝", title: "Smart Capture", description: "Rich forms for notes, links, and insights" },
    { icon: "🤖", title: "AI Processing", description: "Auto-summarization and intelligent tagging" },
    { icon: "🔍", title: "Smart Search", description: "Filter, sort, discover effortlessly" },
    { icon: "🌐", title: "Public API", description: "Query from anywhere with our API" },
  ];

  const steps = [
    { num: "01", title: "Capture", desc: "Save ideas, notes, and links instantly" },
    { num: "02", title: "Organize", desc: "AI automatically tags and categorizes" },
    { num: "03", title: "Discover", desc: "Find what you need in milliseconds" },
    { num: "04", title: "Share", desc: "API access for seamless integration" },
  ];

  const useCases = [
    { icon: "🎓", title: "Students", desc: "Never lose research notes or study materials" },
    { icon: "💼", title: "Professionals", desc: "Build your personal knowledge base" },
    { icon: "🚀", title: "Entrepreneurs", desc: "Track ideas and market insights" },
    { icon: "📚", title: "Researchers", desc: "Organize citations and findings" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden" ref={containerRef}>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 20%, #312e81 40%, #5b21b6 60%, #7c3aed 80%, #ec4899 100%)',
        }}
      >
        {/* Smooth mesh background */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
              </filter>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <rect width="1200" height="800" fill="url(#grad1)" filter="url(#blur)" />
          </svg>
        </div>

        {/* Floating animated shapes */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full blur-3xl opacity-40 pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-500 to-purple-500 rounded-full blur-3xl opacity-35 pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-bl from-pink-400 to-rose-500 rounded-full blur-3xl opacity-30 pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-6 py-24 md:py-40 relative z-10">
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
              <span className="relative inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold border border-white/30 backdrop-blur-xl hover:bg-white/20 transition-all">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
                </span>
                ✨ AI-Powered Knowledge Management
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight tracking-tighter">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="block"
              >
                Your Second
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
              >
                Brain Awaits
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Capture intelligent. Organize seamlessly. Discover instantly. 
              <br className="hidden md:block" />
              <span className="text-transparent bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text">
                Transform scattered thoughts into structured, searchable knowledge with AI.
              </span>
            </motion.p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/capture" 
                className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-110 hover:shadow-2xl shadow-2xl hover:shadow-white/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Capturing
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link 
                href="/dashboard" 
                className="group relative px-8 py-4 border-2 border-white/40 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/80 transition-all hover:scale-105 backdrop-blur-xl hover:shadow-xl"
              >
                <span className="relative z-10">View Dashboard</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">Everything you need to manage knowledge effectively</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-6 rounded-2xl border border-gray-200 hover:border-blue-300 overflow-hidden transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
                <div className="absolute inset-0 border-2 border-blue-500 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Four simple steps to master your knowledge</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-3 text-gray-300 text-3xl">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Perfect For
            </h2>
            <p className="text-xl text-gray-600">Used by experts across all fields</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-gray-200 hover:border-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg transition-all bg-gradient-to-br from-gray-50 to-white"
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">{useCase.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Why Choose Altibbie?
            </h2>
            <p className="text-xl text-gray-300">We're not just a note-taking app</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Lightning Fast", desc: "Search through thousands of items in milliseconds" },
              { title: "AI-Powered", desc: "Automatic tagging, summarization, and insights" },
              { title: "Fully Private", desc: "Your data stays yours. End-to-end encrypted" },
              { title: "Developer Friendly", desc: "Powerful API for custom integrations" },
              { title: "Always Available", desc: "99.9% uptime guarantee with backups" },
              { title: "Beautiful UI", desc: "Delightful experience on all devices" },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
              >
                <h3 className="text-lg font-bold mb-2">✓ {benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Build Your Second Brain?
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              Join thousands of users transforming how they manage knowledge.
            </p>
            <p className="text-sm text-blue-100 mb-8">
              Free forever. No credit card required. Full access to all features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/capture" 
                className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                Get Started Free →
              </Link>
              <Link 
                href="/dashboard" 
                className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
              >
                View Examples
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
