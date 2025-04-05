"use client"

import { useState } from 'react';
import SingleFileUploader from './upload';
import { runVisionOCRFromBuffer } from '@/lib/ocr';

export default function NewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!file) return alert("Please upload a file!");

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');

      const finishedText = await runVisionOCRFromBuffer(base64, file.type);
      setOcrResult(finishedText);
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
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Upload and Process Your File</h1>
        <SingleFileUploader file={file} setFile={setFile} />
        <button
          onClick={onSubmit}
          className={`mt-8 w-full border-2 border-[#595F39] bg-[#595F39] text-white py-4 px-6 rounded-lg font-semibold hover:bg-white hover:text-[#595F39] transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
        {ocrResult && (
          <div className="mt-10 bg-secondary p-6 rounded-lg border border-dark">
            <h2 className="text-2xl font-semibold text-dark">OCR Result:</h2>
            <p className="text-dark mt-4 whitespace-pre-wrap">{ocrResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}