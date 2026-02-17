import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real production app, this key should be proxied via a backend.
// For this demo, we use the process.env.API_KEY as requested.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are FinPilot, an AI-powered financial co-pilot for a banking application.
Your goal is to provide personalized, non-spammy financial guidance, trusted advice, and help with cross-selling banking products only when relevant.

Key Features you support:
1. AstroFin: A financial digital twin simulation.
2. Credit Score Improvement tips.
3. Loan Decision Impact analysis.
4. Scam & Fraud detection.

Tone: Professional, empathetic, encouraging, and concise.
If asked about sensitive user data, pretend you have access to their "Financial Digital Twin" secure context, but do not ask for real personal info.
`;

export const sendMessageToGemini = async (history: { role: string; parts: { text: string }[] }[], message: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "I'm currently running in demo mode without an API key. I can't generate live responses, but I would normally analyze your finances here!";
    }

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error connecting to the financial intelligence core. Please try again later.";
  }
};
