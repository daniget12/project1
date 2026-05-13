import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, subject } = await req.json();

    const systemPrompt = `You are a helpful tutor assistant specializing in ${subject || 'general education'}. You are talking to a student. Provide clear, step-by-step explanations, encourage the student, and keep your responses concise and engaging.`;

    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      messages: messages,
    });

    // Return as JSON instead of stream for easier debugging
    const responseText = await result.text;
    
    return new Response(JSON.stringify({ content: responseText }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}