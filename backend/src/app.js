import express from 'express';
import cors from 'cors';
import routes from "./routes/knowledgeRoute.js";
import publicRoutes from "./routes/publicRoute.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/knowledge',routes);
app.use('/api/public',publicRoutes);

app.get('/health',(_,res)=>{
    res.json({status:"OK"});
});

export default app;