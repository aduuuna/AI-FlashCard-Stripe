import { NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `You are an expert flashcard creator, specializing in generating concise, educational flashcards from given text. Follow these guidelines strictly:

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
11. Only generate 10 flashcards, no more or less.
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

Ensure all JSON is valid and properly formatted.
IMPORTANT: Your response must be ONLY the JSON object. Do not include any other text before or after the JSON.`;

export async function POST(req) {
  const data = await req.text();
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
    });

    const prompt = `${systemPrompt}\n\nHere's the text to create flashcards from:\n${data}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }

    // Parse the JSON response
    let flashcards;
    try {
      flashcards = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Invalid response format from AI" },
        { status: 500 }
      );
    }

    if (!flashcards.flashcards || !Array.isArray(flashcards.flashcards)) {
      return NextResponse.json(
        { error: "Invalid flashcards format" },
        { status: 500 }
      );
    }
    return NextResponse.json(flashcards.flashcards);
  } catch (geminiError) {
    console.error("Gemini AI API error:", geminiError);
    return NextResponse.json(
      { error: "Failed to generate flashcards" },
      { status: 500 }
    );
  }
}
