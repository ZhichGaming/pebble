import NewNote from "@/components/subject/teacher/new/NewNote";
import integrateConcepts from "@/lib/integrateConcepts";
import { Concept } from "@/lib/mongodb/schema";
import { runVisionOCRFromBuffer } from "@/lib/ocr";
import processNotes from "@/lib/processNotes";
import { uploadConcept } from "@/lib/upload/actions";

export default function NewPage() {
  return <NewNote synchronizeConcepts={synchronizeConcepts} processImage={processImage} />;
}

async function synchronizeConcepts(text: string) {
  "use server";

  const concepts = await processNotes(text);

  // const currentConcepts = getConcepts();
  const currentConcepts: Concept[] = [];
  const synced = await integrateConcepts(currentConcepts, concepts);

  for (const concept of synced) {
    uploadConcept(concept);
  }

  return concepts.toString();
}

async function processImage(file: File | undefined) {
  "use server";

  if (!file) return alert("Please upload a file!");

  const response = { text: "", error: "" };

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const finishedText = await runVisionOCRFromBuffer(base64, file.type);

    response.text = finishedText;
  } catch (error) {
    console.error("Error during OCR:", error);
    response.error = "An error occurred while processing the file.";
  }

  return response;
}

