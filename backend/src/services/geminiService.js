import { HfInference } from '@huggingface/inference';

let hfClient = null;

const getHuggingFaceClient = () => {
  if (!hfClient) {
    hfClient = new HfInference(process.env.HUGGING_API_KEY);
  }
  return hfClient;
};

export const summarizeContent = async(content)=>{
    const prompt = `Summarize the following content in 2–3 concise sentences. Focus on the core idea. Avoid fluff.

CONTENT: ${content}

SUMMARY:`;

  const client = getHuggingFaceClient();
  
  try {
    const response = await client.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false,
      }
    });

    return response.generated_text.trim();
  } catch (error) {
    console.error('Hugging Face summarization error:', error);
    // Fallback to simple truncation if API fails
    return content.substring(0, 200) + '...';
  }
}

export const generateTags = async (content) => {
  const prompt = `Generate 3 to 5 concise tags for the following content. Return ONLY a comma-separated list. No explanations or extra text.

CONTENT:
${content}

TAGS:`;

  const client = getHuggingFaceClient();
  
  try {
    const response = await client.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 50,
        temperature: 0.5,
        top_p: 0.95,
        return_full_text: false,
      }
    });

    const text = response.generated_text.trim();
    return text
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(t => t.length > 0);
  } catch (error) {
    console.error('Hugging Face tag generation error:', error);
    // Fallback to simple keyword extraction
    return ['untagged'];
  }
};