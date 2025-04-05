"use client";

import { Concept } from "@/lib/mongodb/schema";
import { getConcepts } from "@/lib/subjects/actions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function List({ concepts }: { concepts: Concept[][] }) {
  const [subjectAndTeacher, setSubjectAndTeacher] = useState<{
    subject: string;
    teacher: string;
  }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chapters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {concepts &&
          concepts?.map((concept, i) => {
            return (
              <div
                key={i}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h2 className="text-lg font-semibold">{concept[0].name}</h2>
                <p className="text-sm text-gray-600">
                  {concept[0].explanation}
                </p>
              </div>
            );
          })}
      </div>
      <Link
        href={`${subjectAndTeacher?.teacher}/new`}
        className="fixed bottom-0 right-0 m-4 inline-block bg-[#595F39] text-white px-4 py-2 rounded-full"
      >
        +
      </Link>
    </div>
  );
}

