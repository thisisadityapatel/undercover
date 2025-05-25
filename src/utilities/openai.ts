import { COVER_LETTER_TEMPLATE } from "./templates";

interface OpenAIResponse {
    choices: Array<{
      message: {
        content: string;
        role: string;
      };
      index: number;
      finish_reason: string;
    }>;
    created: number;
    id: string;
    model: string;
    object: string;
    usage: {
      completion_tokens: number;
      prompt_tokens: number;
      total_tokens: number;
    };
  }

export async function generateCoverLetter({ company, position, description, resume }: {
  company: string,
  position: string,
  description: string,
  resume: string
}): Promise<string> {
  const prompt = `Using the resume below and job information, write a cover letter in a professional and concise tone.

Resume:
${resume}

Company: ${company}
Position: ${position}
Job Description:
${description}

Structure and style should loosely follow this template:
${COVER_LETTER_TEMPLATE}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json() as OpenAIResponse;
  return data.choices[0].message.content.trim();
}