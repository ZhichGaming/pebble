"use server"

import { ai } from './ai';
// import * as dotenv from 'dotenv';

// dotenv.config();

// Convert file buffer to base64
function bufferToBase64(file: Buffer): string {
  return file.toString('base64');
}

// OCR function using Gemini Vision
export async function runVisionOCRFromBuffer(imageBase64: string, mimeType: string): Promise<string> {
  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: mimeType,
    },
  };

  const prompt = `Extract all readable text from this image.`;

  const result = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: [prompt, imagePart] });

  return result.text ?? "error kuhuhuuh";
}
