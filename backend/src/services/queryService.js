import OpenAI from 'openai';

let openai = null;

const getOpenAIClient = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
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

  const prompt = `You are an AI assistant helping to query a personal knowledge base.
Based on the following knowledge items, answer the user's question.
Cite specific knowledge items by their number [1], [2], etc. when relevant.

KNOWLEDGE BASE:
${context}

USER QUESTION:
${question}

Provide a clear, concise answer based on the knowledge base. If the knowledge base doesn't contain relevant information, say so.`;

  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful AI assistant for querying a personal knowledge base." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  return {
    answer: response.choices[0].message.content.trim(),
    sources: knowledgeItems.map(item => ({
      id: item._id,
      title: item.title,
      type: item.type,
    })),
  };
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
