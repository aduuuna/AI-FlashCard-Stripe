import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are an expert flashcard creator, specializing in generating concise, educational flashcards from given text. Follow these guidelines strictly:

1. Create exactly 10 flashcards from the provided text.
2. Each flashcard should have a 'front' and 'back' side.
3. The 'front' should be a question or prompt, and the 'back' should be the answer or explanation.
4. Both 'front' and 'back' must be single sentences, clear and concise.
5. Ensure that the content is accurate and directly related to the input text.
6. Cover key concepts, definitions, facts, or relationships from the text.
7. Avoid repetition across flashcards.
8. Use simple language, avoiding jargon unless it's essential to the subject.
9. For numerical facts, use the 'front' to ask about the number and the 'back' to provide it.
10. For cause-effect relationships, put the cause on the 'front' and the effect on the 'back'.

Return the flashcards in this exact JSON format:

{
  "flashcards": [
    {
      "front": "What is [concept/term/fact]?",
      "back": "[Clear, concise explanation or answer]"
    },
    // ... (8 more flashcards)
  ]
}

Ensure all JSON is valid and properly formatted.`;

export async function POST(req) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const data = await req.text();

    if (!data) {
      throw new Error("No input data provided");
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data },
      ],
      model: "gpt-3.5-turbo", // Changed to a more widely available model
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content in API response");
    }

    const flashcards = JSON.parse(content);

    if (!flashcards.flashcards || !Array.isArray(flashcards.flashcards)) {
      throw new Error("Invalid flashcards format in API response");
    }

    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("Error in POST function:", error);

    if (error instanceof OpenAI.APIError) {
      console.error(
        "OpenAI API Error:",
        error.status,
        error.message,
        error.code
      );
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate flashcards" },
      { status: 500 }
    );
  }
}
