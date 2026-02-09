import {GoogleGenerativeAI} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

const model = genAI.getGenerativeModel({
    model:"gemini-3-flash-preview",
});

export const summarizeContent = async(content)=>{
    const prompt =`
    Summarize the following content in 2–3 concise sentences.
Focus on the core idea. Avoid fluff.
CONTENT:${content}
    ` ;

const result = await model.generateContent(prompt);
return result.response.text().trim();
}

export const generateTags = async (content) => {
  const prompt = `
Generate 3 to 5 concise tags for the following content.
Return ONLY a comma-separated list. No explanations.

CONTENT:
${content}
  `;

  const result = await model.generateContent(prompt);
  return result.response
    .text()
    .split(",")
    .map((t) => t.trim().toLowerCase());
};