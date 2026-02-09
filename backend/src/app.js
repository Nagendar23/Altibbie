import express from 'express';
import cors from 'cors';
import routes from "./routes/knowledgeRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/knowledge',routes);

app.get('/health',(_,res)=>{
    res.json({status:"OK"});
});

export default app;