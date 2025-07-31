"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import SingleFileUploader from "./upload";
import { Concept } from "@/lib/mongodb/schema";

export default function NewNote({
  synchronizeConcepts,
  processImage,
}: {
  processImage: (file: File | undefined) => Promise<void | {
    text: string;
    error: string;
  }>;
  synchronizeConcepts: (text: string) => Promise<Concept[]>;
}) {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState<Concept[]>([]);

  const [text, setText] = useState<string>("");

  const handleProcess = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await processImage(file);
    setText(response?.text || "");
    setFile(undefined);

    if (response?.error) {
      console.error("Error:", response.error);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await synchronizeConcepts(text);
    setConcepts(response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-12 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Upload Image</h1>
        <SingleFileUploader file={file} setFile={setFile} />
        <hr className="my-8" />

        {concepts.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-primary mb-4">Extracted Concepts</h2>
            <ul>
              {concepts.map((concept) => (
                <li key={crypto.randomUUID()}>
                  <span className="font-bold">{concept.name}: </span>
                  {concept.explanation}
                  {concept.examples.length > 0 && (
                    <span className="text-gray-500"> (+{concept.examples.length} example{concept.examples.length > 1 ? "s" : ""})</span>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <textarea
            value={text}
            className="w-full h-64 p-4 border rounded-lg resize-none"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        )}

        {file ? (
          <button
            onClick={handleProcess}
            className={`mt-8 w-full border-2 border-primary bg-primary text-white py-4 px-6 rounded-lg font-semibold transition ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white hover:text-primary"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Process Image"}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`mt-8 w-full border-2 border-primary bg-primary text-white py-4 px-6 rounded-lg font-semibold transition ${
              (!text || loading)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-white hover:text-primary"
            }`}
            disabled={!text || loading}
          >
            Contribute your pebble
          </button>
        )}
      </div>
    </div>
  );
}

