import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { ingredients } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
Return ONLY valid JSON.
Do not use markdown.
Do not add text before or after.
The response must start with { and end with }.

Schema:
{
  "title": string,
  "prepTime": number,
  "ingredients": string[],
  "steps": string[],
  "funFact": string
}

Rules:
- funFact must be 1–2 short sentences
- funFact must be historically or culturally related to the dish
- Do not mention modern brands or dates unless relevant

Create a recipe using: ${ingredients.join(", ")}
Only use ingredients at hand unless more are strictly required.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text;

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    const recipe = JSON.parse(jsonMatch[0]);
    return res.status(200).json(recipe);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({
      error: "AI returned invalid JSON",
    });
  }
}
