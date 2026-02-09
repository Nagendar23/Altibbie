import express from 'express';
import { 
    createKnowledgeItem,
    getAllKnowledgeItems,
    getKnowledgeItemById
} from '../controller/knowledgeController.js';
    
const router = express.Router();

router.post('/',createKnowledgeItem);
router.get('/',getAllKnowledgeItems);

router.get("/_ai-test", async (_, res) => {
  try {
    const { summarizeContent } = await import("../services/geminiService.js");
    const summary = await summarizeContent(
      "Knowledge compounds when it is structured and revisited."
    );
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id',getKnowledgeItemById);

export default router;