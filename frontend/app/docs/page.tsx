"use client";

import { motion } from "framer-motion";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-slate-900">
            Architecture & Design Documentation
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Technical overview of the Second Brain system
          </p>

          {/* Portable Architecture */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 border-b-2 border-blue-600 pb-2">
              1. Portable Architecture
            </h2>
            
            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="mb-6">
                The system is built with clear separation of concerns, making each layer independently swappable:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">Frontend Layer</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Framework:</strong> Next.js 16 with React 19</li>
                    <li><strong>Styling:</strong> Tailwind CSS (swappable with CSS-in-JS)</li>
                    <li><strong>Animations:</strong> Framer Motion (swappable with GSAP)</li>
                    <li><strong>State:</strong> React hooks (can add Redux/Zustand)</li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                  <h3 className="text-xl font-semibold mb-3 text-purple-600">Backend Layer</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Runtime:</strong> Node.js with Express</li>
                    <li><strong>Database:</strong> MongoDB (swappable with PostgreSQL)</li>
                    <li><strong>AI Provider:</strong> OpenAI (swappable with Claude/Gemini)</li>
                    <li><strong>API:</strong> RESTful (can migrate to GraphQL/tRPC)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
                <h4 className="font-semibold mb-2">Service Layer Pattern</h4>
                <p className="text-sm mb-3">
                  All AI operations are abstracted into service modules (<code>geminiService.js</code>, <code>queryService.js</code>), 
                  making it trivial to swap AI providers or add multiple providers with fallback logic.
                </p>
                <pre className="bg-slate-800 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`// Easy to swap AI providers
import { summarizeContent } from './services/geminiService.js';
// Change to: import { summarizeContent } from './services/claudeService.js';`}
                </pre>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
                <h4 className="font-semibold mb-2">Database Abstraction</h4>
                <p className="text-sm">
                  Mongoose models provide a clean abstraction over MongoDB. Migrating to PostgreSQL 
                  would only require changing the model layer while keeping controllers and routes intact.
                </p>
              </div>
            </div>
          </section>

          {/* Principles-Based UX */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 border-b-2 border-blue-600 pb-2">
              2. Principles-Based UX Design
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-black">Immediate Feedback</span>
                </h3>
                <p className="text-slate-700 mb-3">
                  Every user action triggers instant visual feedback through loading states, skeleton loaders, 
                  and success messages. AI processing happens asynchronously—users never wait.
                </p>
                <ul className="text-sm space-y-1 text-slate-600">
                  <li>• Form submissions respond immediately with optimistic UI</li>
                  <li>• AI processing runs fire-and-forget in the background</li>
                  <li>• Loading states use smooth animations, not jarring spinners</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <span className="text-black">Progressive Disclosure</span>
                </h3>
                <p className="text-slate-700 mb-3">
                  Complex features are revealed gradually. The dashboard shows summaries by default, 
                  with full content available on demand. The query interface starts simple with example questions.
                </p>
                <ul className="text-sm space-y-1 text-slate-600">
                  <li>• Dashboard cards show AI summaries, not full content</li>
                  <li>• Query page provides example questions to guide users</li>
                  <li>• Advanced filters hidden but accessible when needed</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <span className="text-black">Delightful Micro-interactions</span>
                </h3>
                <p className="text-slate-700 mb-3">
                  Motion is purposeful and physics-based. Hover states use subtle scale transforms, 
                  navigation transitions are smooth, and page loads fade in naturally.
                </p>
                <ul className="text-sm space-y-1 text-slate-600">
                  <li>• Cards lift on hover with smooth shadow transitions</li>
                  <li>• Navigation bar shows animated active indicator</li>
                  <li>• Background gradients animate subtly for visual interest</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  <span className="text-black">Responsive Clarity</span>
                </h3>
                <p className="text-slate-700 mb-3">
                  Desktop-first design that gracefully adapts to mobile. Typography scales proportionally, 
                  grid layouts collapse intelligently, and interactive elements remain accessible on touch.
                </p>
                <ul className="text-sm space-y-1 text-slate-600">
                  <li>• Single-column layouts on mobile with increased spacing</li>
                  <li>• Touch targets at least 44px for mobile usability</li>
                  <li>• Navigation collapses to hamburger menu on small screens</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  <span className="text-black">Visual Hierarchy & Consistency</span>
                </h3>
                <p className="text-slate-700 mb-3">
                  Type scale follows a clear hierarchy (5xl → 4xl → 2xl → xl → base). 
                  Spacing uses 4px increments. Colors come from a constrained palette of slate, blue, and purple.
                </p>
                <ul className="text-sm space-y-1 text-slate-600">
                  <li>• Headlines are bold and large, body text is readable at 16-18px</li>
                  <li>• Consistent 8px/12px/16px/24px spacing rhythm</li>
                  <li>• Blue for primary actions, purple for accents, slate for text</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Agent Thinking */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 border-b-2 border-blue-600 pb-2">
              3. Agent Thinking & Automation
            </h2>

            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="mb-6">
                The system acts as an intelligent agent that continuously improves your knowledge base:
              </p>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-blue-600">
                  <h4 className="font-bold mb-2 text-lg">Autonomous AI Processing</h4>
                  <p className="mb-3">
                    When you capture knowledge, AI agents automatically:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ <strong>Summarize content</strong> into concise 2-3 sentence summaries</li>
                    <li>✓ <strong>Generate semantic tags</strong> based on content analysis</li>
                    <li>✓ <strong>Merge tags intelligently</strong> without overwriting user input</li>
                    <li>✓ <strong>Process asynchronously</strong> so users never wait for AI</li>
                  </ul>
                  <pre className="bg-slate-800 text-green-400 p-4 rounded text-xs overflow-x-auto mt-4">
{`// Fire-and-forget AI processing
(async () => {
  const [summary, autoTags] = await Promise.all([
    summarizeContent(item.content),
    generateTags(item.content)
  ]);
  item.ai = { summary, autoTags, lastProcessedAt: new Date() };
  item.tags = [...item.tags, ...autoTags]; // Smart merge
  await item.save();
})();`}
                  </pre>
                </div>

                <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-purple-600">
                  <h4 className="font-bold mb-2 text-lg">Intelligent Query Resolution</h4>
                  <p className="mb-3">
                    The query agent doesn&apos;t just search—it understands:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Finds semantically relevant items from your knowledge base</li>
                    <li>✓ Synthesizes answers from multiple sources</li>
                    <li>✓ Cites specific knowledge items in responses</li>
                    <li>✓ Learns from your organization over time (tag patterns)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <h4 className="font-bold mb-2">Future Agent Capabilities (Roadmap)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Link detection:</strong> Automatically identify relationships between notes</li>
                    <li>• <strong>Staleness detection:</strong> Suggest updates for outdated content</li>
                    <li>• <strong>Insight extraction:</strong> Surface patterns across your knowledge</li>
                    <li>• <strong>Smart reminders:</strong> Resurface forgotten knowledge at optimal times</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure Mindset */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 border-b-2 border-blue-600 pb-2">
              4. Infrastructure Mindset & Public API
            </h2>

            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="mb-6">
                Your brain isn&apos;t locked in—it&apos;s infrastructure others can build on:
              </p>

              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white mb-6">
                <h3 className="text-2xl font-bold mb-4">Public Query API</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-green-400 text-sm font-mono mb-2">GET /api/public/brain/query</div>
                    <p className="text-slate-300 text-sm mb-3">
                      Query your knowledge base from anywhere—websites, Slack bots, CLI tools, or mobile apps.
                    </p>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-2">Example Request:</div>
                    <pre className="text-sm text-green-400 overflow-x-auto">
{`curl "http://localhost:8000/api/public/brain/query?q=productivity%20tips"`}
                    </pre>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-2">Example Response:</div>
                    <pre className="text-xs text-blue-300 overflow-x-auto">
{`{
  "question": "productivity tips",
  "answer": "Based on your notes, you focus on...",
  "sources": [
    { "id": "...", "title": "Deep Work Notes", "type": "note" }
  ],
  "relevantCount": 3
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                  <h4 className="font-bold mb-3">Use Cases</h4>
                  <ul className="text-sm space-y-2">
                    <li>📱 Build a mobile companion app</li>
                    <li>🤖 Create a Slack/Discord bot</li>
                    <li>🌐 Embed knowledge search on your blog</li>
                    <li>⌨️ Query from command-line tools</li>
                    <li>🔗 Integrate with Notion, Obsidian, etc.</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                  <h4 className="font-bold mb-3">Built for Scale</h4>
                  <ul className="text-sm space-y-2">
                    <li>✓ RESTful design, easy to cache</li>
                    <li>✓ CORS configured for web apps</li>
                    <li>✓ Rate limiting ready (add middleware)</li>
                    <li>✓ Versioned API path structure</li>
                    <li>✓ JSON responses, standard HTTP codes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 border-b-2 border-blue-600 pb-2">
              Technology Stack
            </h2>

            <div className="grid md:grid-cols-3 gap-6 text-black">
              <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                <h3 className="font-bold mb-4 text-lg">Frontend</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Next.js 16 (App Router)</li>
                  <li>• React 19</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS 4</li>
                  <li>• Framer Motion</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                <h3 className="font-bold mb-4 text-lg">Backend</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Node.js + Express</li>
                  <li>• MongoDB + Mongoose</li>
                  <li>• OpenAI API (GPT-4o-mini)</li>
                  <li>• RESTful API design</li>
                  <li>• CORS & async processing</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                <h3 className="font-bold mb-4 text-lg">Deployment</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Vercel (frontend)</li>
                  <li>• MongoDB Atlas (database)</li>
                  <li>• Render/Railway (backend)</li>
                  <li>• Environment variables</li>
                  <li>• Git-based deployment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* API Documentation */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 border-b-2 border-blue-600 pb-2">
              API Endpoints
            </h2>

            <div className="space-y-4">
              <div className="bg-white rounded-lg border-2 border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200">
                  <code className="text-green-600 font-bold">POST /api/knowledge</code>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600 mb-2">Create a new knowledge item with AI processing</p>
                  <p className="text-xs text-slate-500">Body: {`{ title, content, type, tags }`}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border-2 border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200">
                  <code className="text-blue-600 font-bold">GET /api/knowledge</code>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600">Retrieve all knowledge items sorted by date</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border-2 border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200">
                  <code className="text-purple-600 font-bold">POST /api/knowledge/query</code>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600 mb-2">Query knowledge base with AI-powered answers</p>
                  <p className="text-xs text-slate-500">Body: {`{ question }`}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border-2 border-blue-200 overflow-hidden">
                <div className="bg-blue-100 px-6 py-3 border-b border-blue-200">
                  <code className="text-blue-700 font-bold">GET /api/public/brain/query?q=question</code>
                  <span className="ml-3 text-xs bg-blue-200 px-2 py-1 rounded">PUBLIC</span>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600">Public endpoint for external integrations</p>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
