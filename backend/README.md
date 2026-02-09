# Backend Setup Instructions

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- OpenAI API key

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file in the backend root directory:**
   ```bash
   touch .env
   ```

3. **Add the following environment variables to `.env`:**
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/secondbrain
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secondbrain?retryWrites=true&w=majority
   ```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:8000`

## API Endpoints

### Health Check
```
GET /health
```

### Knowledge Management
```
POST   /api/knowledge          # Create knowledge item
GET    /api/knowledge          # Get all knowledge items
GET    /api/knowledge/:id      # Get specific knowledge item
POST   /api/knowledge/query    # Query knowledge base with AI
```

### Public API
```
GET    /api/public/brain/query?q=your+question  # Public query endpoint
```

## Testing

Test the health endpoint:
```bash
curl http://localhost:8000/health
```

Test AI processing:
```bash
curl http://localhost:8000/api/knowledge/_ai-test
```

## MongoDB Connection

### Local MongoDB
Make sure MongoDB is running:
```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

### MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user
3. Whitelist your IP address (or allow from anywhere for development)
4. Copy the connection string and add to `.env`

## Environment Variables Explained

- **PORT**: Port number for the server (default: 8000)
- **MONGODB_URI**: MongoDB connection string
- **OPENAI_API_KEY**: Your OpenAI API key for AI features

## Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running
- Verify connection string in `.env`
- Check firewall/network settings for MongoDB Atlas

### OpenAI API Issues
- Verify API key is correct
- Check OpenAI account has credits
- Ensure API key has proper permissions

### Port Already in Use
Change PORT in `.env` to a different number (e.g., 8001)

## Project Structure

```
backend/
├── src/
│   ├── app.js                      # Express app setup
│   ├── index.js                    # Server entry point
│   ├── config/
│   │   └── db.js                  # Database connection
│   ├── models/
│   │   └── knowledgeItem.js       # Mongoose schema
│   ├── controllers/
│   │   ├── knowledgeController.js # CRUD operations
│   │   └── queryController.js     # AI query logic
│   ├── services/
│   │   ├── geminiService.js       # AI processing
│   │   └── queryService.js        # Query processing
│   └── routes/
│       ├── knowledgeRoute.js      # Main routes
│       └── publicRoute.js         # Public API routes
├── package.json
└── .env (create this file)
```

## NPM Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **openai**: OpenAI API client
- **cors**: CORS middleware
- **dotenv**: Environment variable management

## Dev Dependencies

- **nodemon**: Auto-restart server on file changes
