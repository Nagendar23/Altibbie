import express from 'express';
import { publicQuery } from '../controller/queryController.js';

const router = express.Router();

// Public API endpoint for querying the brain
router.get('/brain/query', publicQuery);

export default router;
