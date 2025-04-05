import requestAI from "./ai";
import { Concept } from "./mongodb/schema";

export default async function processNotes(notes: string): Promise<Concept[]> {
	const prompt = `You will be given a set of notes and you will return a JSON array, with the fields: "concept", "explanation" and "examples", with examples being an array.
	
	Instructions:

	- Read through the notes submitted to you.
	- Give a detailed explanation of the concepts in the notes.
	- Write the examples present in the notes.
	- Output your response in JSON.
	- Keep it concise.
	- Stick to the facts.
	- Do not hallucinate.
	- If there are conflicting opinions, only include the opinion that is recorded the most.
	- Do not include any irrelevant information.
	- Do not mention any personally identifiable information.
	- Keep the language of the values in the same language as the input.
	- Only return the JSON object, do not include any other text, do not include any code block markers or strings.

	Notes: 

	${notes}`;

	let response = await requestAI(prompt);
	response = response.replace(/```json\s/g, "").replace(/\s```/g, "");

	return JSON.parse(response) as Concept[]; 
}
