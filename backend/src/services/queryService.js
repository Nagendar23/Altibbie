import { HfInference } from '@huggingface/inference';

let hfClient = null;

const getHuggingFaceClient = () => {
  if (!hfClient) {
    hfClient = new HfInference(process.env.HUGGING_API_KEY);
  }
  return hfClient;
};

/**
 * Query the knowledge base using AI
 * Returns relevant knowledge items with AI-generated answer
 */
export const queryKnowledge = async (question, knowledgeItems) => {
  // Build context from knowledge items
  const context = knowledgeItems
    .map((item, idx) => {
      return `[${idx + 1}] ${item.title}\n${item.ai?.summary || item.content}\nTags: ${item.tags?.join(', ') || 'none'}`;
    })
    .join('\n\n---\n\n');

  const prompt = `You are an AI assistant helping to query a personal knowledge base. Based on the following knowledge items, answer the user's question. Cite specific knowledge items by their number [1], [2], etc. when relevant.

KNOWLEDGE BASE:
${context}

USER QUESTION:
${question}

Provide a clear, concise answer based on the knowledge base. If the knowledge base doesn't contain relevant information, say so.

ANSWER:`;

  const client = getHuggingFaceClient();
  
  try {
    const response = await client.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false,
      }
    });

    return {
      answer: response.generated_text.trim(),
      sources: knowledgeItems.map(item => ({
        id: item._id,
        title: item.title,
        type: item.type,
      })),
    };
  } catch (error) {
    console.error('Hugging Face query error:', error);
    // Fallback response
    return {
      answer: "I found relevant knowledge items but couldn't generate a detailed answer. Please review the sources below.",
      sources: knowledgeItems.map(item => ({
        id: item._id,
        title: item.title,
        type: item.type,
      })),
    };
  }
};

/**
 * Find relevant knowledge items based on query
 */
export const findRelevantKnowledge = (query, allItems) => {
  const queryLower = query.toLowerCase();
  
  return allItems.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(queryLower);
    const contentMatch = item.content.toLowerCase().includes(queryLower);
    const summaryMatch = item.ai?.summary?.toLowerCase().includes(queryLower);
    const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(queryLower));
    
    return titleMatch || contentMatch || summaryMatch || tagsMatch;
  });
};
