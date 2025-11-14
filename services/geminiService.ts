
import { GoogleGenAI } from "@google/genai";
import { AITask } from "../types";

const getSystemInstruction = (task: AITask | string): string => {
    switch (task) {
        case AITask.EXPLAIN:
            return "You are a senior software engineer. Explain the provided code snippet clearly and concisely. Focus on its purpose, how it works, and any potential improvements. Use markdown for formatting.";
        case AITask.REFACTOR:
            return "You are a senior software engineer specializing in code quality. Refactor the given code to improve its readability, efficiency, and maintainability. Only output the raw, refactored code. Do not include any explanation or markdown formatting.";
        case AITask.DOCUMENT:
            return "You are a senior software engineer. Add clear and concise documentation (e.g., JSDoc, TSDoc) to the given code. Only output the raw, documented code. Do not include any explanation or markdown formatting.";
        case AITask.FIND_BUGS:
            return "You are a senior software engineer and an expert in debugging. Analyze the provided code for any potential bugs, logical errors, or anti-patterns. Provide a list of findings with explanations and suggested fixes. Use markdown for formatting.";
        default:
            return "You are WesAI, a helpful and pragmatic AI coding assistant and strategic partner. Fulfill the user's request regarding the provided code snippet.";
    }
};

export const getAIResponse = async (task: AITask | string, code: string): Promise<string> => {
  // This is a placeholder for a real API key which should be stored in an environment variable.
  // The guidance says to assume process.env.API_KEY is available.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable not set.");
    return "Error: API key is not configured. Please set the API_KEY environment variable.";
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = getSystemInstruction(task);
  
  const prompt = `
  Task: ${task}
  ---
  Code:
  \`\`\`
  ${code}
  \`\`\`
  ---
  Response:
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.3,
            topP: 0.95,
        },
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI.");
  }
};
