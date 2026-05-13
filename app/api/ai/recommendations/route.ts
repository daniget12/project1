import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { SAMPLE_TUTORS } from '@/lib/data';

export async function POST(req: Request) {
  try {
    const { interests } = await req.json();

    const prompt = `
      You are an expert tutor matching assistant. A student has the following interests or struggles: "${interests}".
      
      Here is the list of available tutors (in JSON format):
      ${JSON.stringify(SAMPLE_TUTORS, null, 2)}
      
      Analyze the student's needs and return the IDs of the top 2 best-matching tutors along with a short, 1-sentence reason for each match.
      Format your response exactly as valid JSON matching this schema:
      {
        "recommendations": [
          { "tutorId": "string", "reason": "string" }
        ]
      }
      Do not include any other text besides the JSON.
    `;

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
    });

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (e) {
      // Fallback if model doesn't return pure JSON
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        jsonResponse = JSON.parse(match[0]);
      } else {
        throw new Error('Failed to parse model response as JSON');
      }
    }

    return new Response(JSON.stringify(jsonResponse), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in recommendations route:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate recommendations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
