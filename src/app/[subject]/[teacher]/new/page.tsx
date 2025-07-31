import NewNote from "@/components/subject/teacher/new/NewNote";
import integrateConcepts from "@/lib/integrateConcepts";
import { Concept } from "@/lib/mongodb/schema";
import { runVisionOCRFromBuffer } from "@/lib/ocr";
import processNotes from "@/lib/processNotes";
import { getConcept, getConceptsByTeacher } from "@/lib/subjects/actions";
import { addConceptToSubject, uploadConcept } from "@/lib/upload/actions";

export default function NewPage({
  params
}: {
  params: Promise<{ subject: string; teacher: string }>;
}) {
  return <NewNote params={params} synchronizeConcepts={synchronizeConcepts} processImage={processImage} />;
}

async function synchronizeConcepts(text: string, subject: string, teacher: string) {
  "use server";

  const concepts = await processNotes(text);

  const currentConcepts = JSON.parse(await getConceptsByTeacher(subject, teacher));
  console.log("Current concepts:", currentConcepts);
  const synced = await integrateConcepts(concepts, currentConcepts);
  console.log("Synced concepts:", synced);

  for (const concept of synced) {
    await uploadConcept(concept);
    addConceptToSubject(subject, teacher, concept.name);
  }

  return concepts;
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

