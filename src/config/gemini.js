import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function runChat(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error(error);

    // Gemini servers busy
    if (error.message?.includes('"code":503')) {
      return "Gemini servers are busy. Please try again later.";
    }

    // API key / permission / quota problems
    if (
      error.message?.includes('"code":401') ||
      error.message?.includes('"code":403') ||
      error.message?.includes('"code":429')
    ) {
      return "Error connecting to Gemini.";
    }

    return "Something went wrong.";
  }
}
