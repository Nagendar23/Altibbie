import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from "./routes/knowledgeRoute.js";
import publicRoutes from "./routes/publicRoute.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');

// CORS configuration
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/knowledge', routes);
app.use('/api/public', publicRoutes);

app.get('/health', (_, res) => {
  res.json({ status: "OK" });
});

export default app;