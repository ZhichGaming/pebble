import requestAI from "./ai";
import { Concept } from "./mongodb/schema";

export default async function integrateConcepts(newConcepts: Concept[], existingConcepts: Concept[]): Promise<Concept[]> {
  const prompt = `You will be given a list of existing concepts and a list of new concepts and you will return a JSON array, with the fields: "concept", "explanation" and "examples", with examples being an array.
  
  Instructions:
  - Read through the existing concepts and the new concepts.
  - Integrate the new concepts into the existing concepts.
  - If there are similar concepts, merge them into the most appropriate one.
	- Integrate the new examples into the existing examples if relevant.
  - Output your response in JSON.
  - Keep it concise.
  - Stick to the facts.
  - Do not hallucinate.
  - If there are conflicting opinions, only include the opinion that is recorded the most.
  - Do not include any irrelevant information.
  - Do not mention any personally identifiable information.
  - Keep the language of the values in the same language as the input.
	- Only return the JSON object, do not include any other text, do not include any code block markers or strings.
  - Only return the concepts that are new or have been modified, DO NOT return the existing concepts that have NOT been modified. What you return should not be the final list of concepts, but rather the changes that should be made to the existing concepts.

  Existing Concepts:
  ${JSON.stringify(existingConcepts)}
  
  New Concepts:
  ${JSON.stringify(newConcepts)}`;

  let response = await requestAI(prompt);
	response = response.replace(/```json\s/g, "").replace(/\s```/g, "");

  const integratedConcepts = JSON.parse(response).map((concept: any) => ({
    name: concept.concept,
    explanation: concept.explanation,
    examples: concept.examples,
  })) as Concept[];

  return integratedConcepts;
}
