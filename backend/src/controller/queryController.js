import KnowledgeItem from "../models/KnowledgeItem.js";
import { queryKnowledge, findRelevantKnowledge } from "../services/queryService.js";

/**
 * Public endpoint to query the knowledge base
 * GET /api/public/brain/query?q=your+question
 */
export const publicQuery = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ 
        error: "Query parameter 'q' is required" 
      });
    }

    // Get all knowledge items
    const allItems = await KnowledgeItem.find().sort({ createdAt: -1 });
    
    // Find relevant items
    const relevantItems = findRelevantKnowledge(q, allItems);
    
    // If no relevant items, use all items (limiting to 20 most recent)
    const itemsToQuery = relevantItems.length > 0 
      ? relevantItems.slice(0, 10) 
      : allItems.slice(0, 20);

    // Query with AI
    const result = await queryKnowledge(q, itemsToQuery);

    res.json({
      question: q,
      answer: result.answer,
      sources: result.sources,
      relevantCount: relevantItems.length,
    });

  } catch (error) {
    console.error('Public query error:', error);
    res.status(500).json({ error: "Failed to process query" });
  }
};

/**
 * Internal query endpoint for authenticated users
 * POST /api/knowledge/query
 */
export const knowledgeQuery = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question || question.trim() === '') {
      return res.status(400).json({ 
        error: "Question is required" 
      });
    }

    // Get all knowledge items
    const allItems = await KnowledgeItem.find().sort({ createdAt: -1 });
    
    // Find relevant items
    const relevantItems = findRelevantKnowledge(question, allItems);
    
    // Use relevant items or all items as fallback
    const itemsToQuery = relevantItems.length > 0 
      ? relevantItems 
      : allItems.slice(0, 20);

    // Query with AI
    const result = await queryKnowledge(question, itemsToQuery);

    res.json({
      question,
      answer: result.answer,
      sources: result.sources,
      relevantItems: relevantItems.length,
      totalItems: allItems.length,
    });

  } catch (error) {
    console.error('Knowledge query error:', error);
    res.status(500).json({ error: error.message });
  }
};
