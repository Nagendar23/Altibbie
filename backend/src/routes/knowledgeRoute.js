import express from 'express';
import {
  createKnowledgeItem,
  getAllKnowledgeItems,
  getKnowledgeItemById,
  deleteKnowledgeItem,
  updateKnowledgeItem
} from '../controller/knowledgeController.js';
import { knowledgeQuery } from '../controller/queryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All knowledge routes are protected
router.use(protect);

router.post('/', createKnowledgeItem);
router.get('/', getAllKnowledgeItems);
router.post('/query', knowledgeQuery);
router.get('/:id', getKnowledgeItemById);
router.put('/:id', updateKnowledgeItem);
router.delete('/:id', deleteKnowledgeItem);

export default router;