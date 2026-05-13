import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { sessionDescription } = await req.json();

    const prompt = `
      You are a tutor summarizing a recent lesson. 
      Read the following session description/notes:
      "${sessionDescription}"
      
      Return a concise, bulleted summary of the lesson, including the main topics covered and 1-2 actionable next steps or homework items for the student.
    `;

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
    });

    return new Response(JSON.stringify({ summary: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in summarize route:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate summary' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
