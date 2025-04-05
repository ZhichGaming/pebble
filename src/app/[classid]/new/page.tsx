"use client"

import { useState } from 'react';
import SingleFileUploader from './upload';
// import '@/components/page.css';
import { runVisionOCRFromBuffer } from '@/lib/ocr';

export default function NewPage() {
  const [file, setFile] = useState<File | null>(null);
  
  const onSubmit = async () => {
    console.log(file)
    if (!file) return "NO FULE!!!!!!!!!!!!"

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')

    const finishedText = await runVisionOCRFromBuffer(base64, file.type)
    console.log(finishedText)
  }
  
  return (
    <>
      
      <h1>React File Upload</h1>
      <SingleFileUploader file={file} setFile={setFile}/>
      <button onClick={onSubmit}>Submit</button>
      
    </>
  );
}

