import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    console.log(response.text);

    return Response.json(response.text);
  } catch (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
