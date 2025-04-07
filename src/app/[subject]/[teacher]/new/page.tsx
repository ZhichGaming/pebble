"use client";

import { useState } from "react";
import SingleFileUploader from "./upload";
import { runVisionOCRFromBuffer } from "@/lib/ocr";
import processNotes from "@/lib/processNotes";
import { getConcepts } from "@/lib/subjects/actions";
import integrateConcepts from "@/lib/integrateConcepts";
import { Concept } from "@/lib/mongodb/schema";
import { uploadConcept } from "@/lib/upload/actions";

export default function NewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const onSubmit = async () => {
    if (!file) return alert("Please upload a file!");

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");

      const finishedText = await runVisionOCRFromBuffer(base64, file.type);
      setText(finishedText);
    } catch (error) {
      console.error("Error during OCR:", error);
      setOcrResult("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-12 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Upload Image</h1>
        <SingleFileUploader file={file} setFile={setFile} />
        <button
          onClick={onSubmit}
          className={`mt-8 w-full border-2 border-primary bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-white hover:text-primary transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
        {summary ? (
          <p>{summary}</p>
        ) : (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        )}

        <button
          onClick={async () => {
            const concepts = await processNotes(text);

            setSummary(concepts.toString());

            // const currentConcepts = getConcepts();
            const currentConcepts: Concept[] = [];
            const synced = await integrateConcepts(currentConcepts, concepts);

            for (const concept of synced) {
              uploadConcept(concept);
            }
          }}
        >
          Contribute your pebble
        </button>
      </div>
    </div>
  );
}

