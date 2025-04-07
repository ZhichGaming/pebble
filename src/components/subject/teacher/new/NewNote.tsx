"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import SingleFileUploader from "./upload";

export default function NewNote({
  handleClick,
  doSubmit,
}: {
  handleClick: (text: string) => Promise<any>;
  doSubmit: (file: File | undefined) => Promise<void | {
    text: string;
    error: string;
  }>;
}) {
  const [file, setFile] = useState<File>();
  const [ocrResult, setOcrResult] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string>("");

  const [text, setText] = useState<string>("");

  useEffect(() => {
    console.log(file);
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await doSubmit(file);

    if (response) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-12 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Upload Image</h1>
        <SingleFileUploader file={file!} setFile={setFile} />
        <button
          onClick={handleSubmit}
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
            setSummary(await handleClick(text));
          }}
        >
          Contribute your pebble
        </button>
      </div>
    </div>
  );
}

