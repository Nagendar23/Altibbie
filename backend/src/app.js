import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from "./routes/knowledgeRoute.js";
import publicRoutes from "./routes/publicRoute.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim().replace(/\/$/, ""));

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`); // Log the blocked origin for debugging
      console.log('Allowed Origins:', allowedOrigins); // Log allowed origins to check config
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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