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

export const summarizeContent = async(content)=>{
    const prompt =`
    Summarize the following content in 2–3 concise sentences.
Focus on the core idea. Avoid fluff.
CONTENT:${content}
    ` ;

const client = getOpenAIClient();
const message = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "user", content: prompt }
  ],
});

return message.choices[0].message.content.trim();
}

export const generateTags = async (content) => {
  const prompt = `
Generate 3 to 5 concise tags for the following content.
Return ONLY a comma-separated list. No explanations.

CONTENT:
${content}
  `;

  const client = getOpenAIClient();
  const message = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ],
  });

  const text = message.choices[0].message.content;
  return text
    .split(",")
    .map((t) => t.trim().toLowerCase());
};