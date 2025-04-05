"use client";

import { Concept } from "@/lib/mongodb/schema";
import { getConcepts } from "@/lib/subjects/actions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function List({ concepts }: { concepts: Concept[] }) {
  const [subjectAndTeacher, setSubjectAndTeacher] = useState<{
    subject: string;
    teacher: string;
  }>();

  return (
    <div className="p-4 flex">
			<div className="flex-grow">
				<h1 className="text-2xl font-bold mb-4">Chapters</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
					{concepts?.map((concept) => (
						<div
							key={concept.toString()}
							className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
						>
							<h2 className="text-lg font-semibold">{concept.name}</h2>
							<p className="text-sm text-gray-600">{concept.explanation}</p>
						</div>
					))}
				</div>
			</div>

			<div className="sticky top-3 w-px bg-gray-300 mx-8 my-3"></div>

			<div className="sticky top-0 w-full">
				{concepts?.map((concept) => (
					<div
						key={concept.toString()}
						className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
					>
						<h2 className="text-lg font-semibold">{concept.name}</h2>
						<div className="flex gap-x-4 opacity-60">
							<div className="flex mb-1 items-center">
								<p>{concept.examples?.length} examples</p>
							</div>
							<div className="flex mb-1 items-center">
								<p>{concept.explanation?.length} words</p>
							</div>
						</div>
						<hr className="my-2" />

						<div className="flex mb-1 items-center">
							<h2 className="text-xl font-bold">Explanation</h2>
							<p>{concept.explanation}</p>
						</div>

						<div className="flex mb-1 items-center">
							<h2 className="text-xl font-bold">Examples</h2>
							{concept.examples?.map((example) => (
								<p>{example}</p>
							))}
						</div>
						<hr className="my-2" />
					</div>
				)) ?? <p>Click a concept from the left side to view</p>}
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

