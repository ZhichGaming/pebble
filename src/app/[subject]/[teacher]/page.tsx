"use client";

import React, { useEffect, useState } from "react";
import { Concept, Subject } from "@/lib/mongodb/schema";
import { getConcepts, getSubjects } from "@/lib/subjects/actions";
import Link from "next/link";

// export default function ChapterGrid() {
// 	const router = useRouter();
// 	const subjects = getSubjects() as unknown as Subject[];
// 	const classObj = subjects.find(s => s._id == router.query.classid as string)?.teachers[0];

// 	return (
// 		<div className="p-4">
// 			<h1 className="text-2xl font-bold mb-4">Chapters</h1>
// 			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// 				{classObj?.concepts.map((concept) => (
// 					<div
// 						key={concept.toString()}
// 						className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
// 					>
// 						<h2 className="text-lg font-semibold">{subject.name}</h2>
// 						<p className="text-sm text-gray-600">{subject.}</p>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

export default function StudyGuideList({
  params,
}: {
  params: Promise<{ subject: string; teacher: string }>;
}) {
  const [subjectObj, setSubject] = useState<Subject | null>(null);
  const [concepts, setConcepts] = useState<Concept[] | null>(null);
	const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [subjectAndTeacher, setSubjectAndTeacher] = useState<{
    subject: string;
    teacher: string;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      const { subject, teacher } = await params;
      setSubjectAndTeacher({ subject, teacher });

      const subjects = JSON.parse(await getSubjects()) as Subject[];
      const newSubjectObjects = subjects.find(
        (s) => s._id.toString() == subject
      ) as Subject;

      if (!newSubjectObjects) {
        throw new Error("Subject not found");
      }

      const newTeacherObjects = newSubjectObjects?.teachers.find(
        (t) => encodeURIComponent(t.name) == teacher
      );

      if (!newTeacherObjects) {
        throw new Error("Teacher not found");
      }

      setSubject(newSubjectObjects);

      const concepts = await getConcepts(newTeacherObjects.concepts);

      setConcepts(JSON.parse(concepts) as Concept[]);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 flex">
			<div className="flex-grow">
				<h1 className="text-2xl font-bold mb-4">Chapters</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

			<div className="sticky top-0 flex-1 w-64">
				{concepts?.map((concept) => (
					<div
						key={concept.toString()}
						className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
					>
						<h2 className="text-lg font-semibold">{concept.name}</h2>
						<div className="flex gap-x-4 opacity-60">
							<div className="flex mb-1 items-center">
								<p>{concept.examples.length} examples</p>
							</div>
							<div className="flex mb-1 items-center">
								<p>{concept.explanation.length} words</p>
							</div>
						</div>
						<hr className="my-2" />

						<div className="flex mb-1 items-center">
							<h2 className="text-xl font-bold">Explanation</h2>
							<p>{concept.explanation}</p>
						</div>

						<div className="flex mb-1 items-center">
							<h2 className="text-xl font-bold">Examples</h2>
							{concept.examples.map((example) => (
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

