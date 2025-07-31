"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import SingleFileUploader from "./upload";

export default function NewNote({
  synchronizeConcepts,
  processImage,
}: {
  processImage: (file: File | undefined) => Promise<void | {
    text: string;
    error: string;
  }>;
  synchronizeConcepts: (text: string) => Promise<any>;
}) {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string>("");

  const [text, setText] = useState<string>("");

  useEffect(() => {
    console.log(file);
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await processImage(file);
    setText(response?.text || "");
    setFile(undefined);

    if (response?.error) {
      console.error("Error:", response.error);
    }

    if (response) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-12 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Upload Image</h1>
        <SingleFileUploader file={file} setFile={setFile} />
        <hr className="my-8" />

        {summary ? (
          <p>{summary}</p>
        ) : (
          <textarea
            value={text}
            className="w-full h-64 p-4 border rounded-lg resize-none"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        )}

        {file ? (
          <button
            onClick={handleSubmit}
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
            onClick={async () => {
              setSummary(await synchronizeConcepts(text));
            }}
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

