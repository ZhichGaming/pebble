import React, { useEffect, useState } from 'react';
import { Concept, Subject, Teacher } from '@/lib/mongodb/schema';
import { getSubjects } from '@/lib/subjects/actions';

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
		params: Promise<{ subject: string, teacher: string }>;
	}) {
	const [subjectObj, setSubject] = useState<Subject | null>(null);
	const [concepts, setConcepts] = useState<Concept[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const { subject, teacher } = await params;
			console.log(subject, teacher);

			const subjects = await getSubjects();
			const newSubjectObjects = subjects.find(s => s._id.toString() == subject) as Subject;

			if (!newSubjectObjects) {
				throw new Error('Subject not found');
			}

			const newTeacherObjects = newSubjectObjects?.teachers.find(t => encodeURIComponent(t.name) == encodeURIComponent(teacher));

			if (!newTeacherObjects) {
				throw new Error('Teacher not found');
			}

			setSubject(newSubjectObjects);
			setConcepts(newTeacherObjects.concepts);
		};

		fetchData();
	}, []);
	
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Chapters</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{concepts?.map((concept) => (
					<div
						key={concept.toString()}
						className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
					>
						<h2 className="text-lg font-semibold">{concept.concept}</h2>
						<p className="text-sm text-gray-600">{concept.explanation}</p>
					</div>
				))}
			</div>
		</div>
	);
}
