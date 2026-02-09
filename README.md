# Second Brain - AI-Powered Knowledge Management System

![Second Brain](https://img.shields.io/badge/AI-Powered-blue) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-61dafb) ![Node.js](https://img.shields.io/badge/Node.js-Express-green)

> **Transform scattered thoughts into structured intelligence.** A sophisticated "Second Brain" application that captures, organizes, and intelligently surfaces knowledge using AI.

## 🌟 Features

### ✨ Core Functionality
- **📝 Smart Capture**: Rich forms for notes, links, and insights with flexible tagging
- **🤖 AI Processing**: Automatic summarization and intelligent auto-tagging using OpenAI GPT-4
- **🔍 Intelligent Dashboard**: Search, filter, and sort knowledge items with beautiful UI
- **💬 Conversational AI Query**: Ask questions about your knowledge base in natural language
- **🌐 Public API**: RESTful API endpoint for external integrations

### 🎨 Design & UX
- **Motion & Delight**: Smooth animations using Framer Motion
- **Micro-interactions**: Hover effects, loading states, and transitions
- **Visual Hierarchy**: Clean typography and consistent spacing
- **Responsive Design**: Desktop-first with mobile-friendly layouts
- **Skeleton Loaders**: Professional loading states while fetching data

### 🏗️ Architecture Highlights
- **Portable Architecture**: Swappable components at each layer
- **Service Layer Pattern**: Easy to swap AI providers (OpenAI → Claude/Gemini)
- **Async AI Processing**: Fire-and-forget background processing
- **RESTful API Design**: Clean, versioned endpoints
- **Clean Separation**: Frontend, Backend, Database, AI layers

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **AI**: OpenAI API (GPT-4o-mini)
- **Architecture**: RESTful API

### Deployment
- **Frontend**: Vercel (recommended)
- **Backend**: Railway/Render
- **Database**: MongoDB Atlas

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- OpenAI API Key

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=8000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
EOF

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
EOF

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app!

## 📚 API Documentation

### Knowledge Endpoints

#### Create Knowledge Item
```http
POST /api/knowledge
Content-Type: application/json

{
  "title": "My Note",
  "content": "Knowledge compounds when revisited",
  "type": "note",
  "tags": ["learning", "productivity"]
}
```

#### Get All Knowledge Items
```http
GET /api/knowledge
```

#### Query Knowledge Base (Internal)
```http
POST /api/knowledge/query
Content-Type: application/json

{
  "question": "What are my productivity tips?"
}
```

### Public API

#### Query Brain (Public)
```http
GET /api/public/brain/query?q=your+question+here
```

**Response:**
```json
{
  "question": "your question here",
  "answer": "AI-generated answer based on your knowledge",
  "sources": [
    {
      "id": "123",
      "title": "Relevant Note",
      "type": "note"
    }
  ],
  "relevantCount": 3
}
```

## 🏛️ Architecture & Design Principles

Visit [/docs](http://localhost:3000/docs) for comprehensive architecture documentation including:

1. **Portable Architecture**: Swappable layers (Frontend, Backend, Database, AI)
2. **Principles-Based UX**: 5 core design principles
3. **Agent Thinking**: Autonomous AI processing and automation
4. **Infrastructure Mindset**: Public API for external integrations

## 🎯 Project Structure

```
Altibbie/
├── frontend/                   # Next.js frontend
│   ├── app/
│   │   ├── page.tsx           # Landing page with animations
│   │   ├── capture/           # Knowledge capture form
│   │   ├── dashboard/         # Knowledge dashboard
│   │   ├── query/             # AI query interface
│   │   ├── docs/              # Architecture documentation
│   │   ├── components/        # Shared components
│   │   └── layout.tsx         # Root layout with navigation
│   └── package.json
│
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── app.js            # Express app configuration
│   │   ├── index.js          # Server entry point
│   │   ├── config/
│   │   │   └── db.js         # MongoDB connection
│   │   ├── models/
│   │   │   └── knowledgeItem.js  # Mongoose schema
│   │   ├── controllers/
│   │   │   ├── knowledgeController.js
│   │   │   └── queryController.js
│   │   ├── services/
│   │   │   ├── geminiService.js   # AI summarization/tagging
│   │   │   └── queryService.js    # AI query processing
│   │   └── routes/
│   │       ├── knowledgeRoute.js
│   │       └── publicRoute.js
│   └── package.json
│
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/secondbrain
OPENAI_API_KEY=sk-...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically on push

### Backend (Railway/Render)
1. Create new service from GitHub
2. Add environment variables
3. Set build command: `npm install`
4. Set start command: `npm start`

### Database (MongoDB Atlas)
1. Create free cluster on MongoDB Atlas
2. Whitelist IP addresses or allow all
3. Copy connection string to backend .env

## 🎨 Design Philosophy

### Visual Hierarchy
- Headlines: 5xl → 4xl → 3xl
- Body text: 16-18px for readability
- Consistent spacing: 8px increments

### Color Palette
- **Primary**: Blue (blue-600)
- **Accent**: Purple (purple-600)
- **Text**: Slate (slate-900, slate-600)
- **Background**: Gradients (slate-50 to blue-50)

### Animation Principles
- **Duration**: 0.2s for interactions, 0.6s for page loads
- **Easing**: Spring physics for natural motion
- **Trigger**: Hover, scroll, and state changes

## 🧪 Key Features Implementation

### Fire-and-Forget AI Processing
```javascript
// User gets immediate response
res.status(201).json(item);

// AI processes in background
(async () => {
  const [summary, autoTags] = await Promise.all([
    summarizeContent(item.content),
    generateTags(item.content)
  ]);
  await item.save();
})();
```

### Smart Tag Merging
```javascript
// Merge user tags + AI tags without duplicates
item.tags = Array.from(new Set([...item.tags, ...autoTags]));
```

### Semantic Search & Query
```javascript
// Find relevant items
const relevantItems = findRelevantKnowledge(query, allItems);

// Generate AI answer with citations
const result = await queryKnowledge(question, relevantItems);
```

## 🛣️ Future Enhancements

### Planned Features
- [ ] Vector search using pgvector or Pinecone
- [ ] Graph visualization of note relationships
- [ ] User authentication and multi-user support
- [ ] File upload with metadata extraction
- [ ] Command palette (⌘K) for power users
- [ ] Browser extension for quick capture
- [ ] Mobile app (React Native)

### Advanced AI Features
- [ ] Link detection between notes
- [ ] Staleness detection for outdated content
- [ ] Insight extraction across knowledge
- [ ] Smart reminders for forgotten knowledge

## 📖 Documentation

- **Architecture**: Visit [/docs](http://localhost:3000/docs) for detailed architecture
- **API Reference**: See API section above
- **Design Principles**: Documented in /docs page

## 🤝 Contributing

This is a technical assessment project for Altibbe. Not currently accepting contributions.

## 📝 License

MIT

## 🙏 Acknowledgments

Built as part of the Altibbe Engineering Assessment by Nagendar23

---

**Made with 🧠 and ❤️ | Powered by AI**
