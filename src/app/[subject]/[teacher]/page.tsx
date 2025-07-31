import { Concept, Subject } from "@/lib/mongodb/schema";
import List from "../../../components/subject/teacher/List";
import { getConcepts, getSubjects } from "@/lib/subjects/actions";

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

export default async function StudyGuideList({
  params,
}: {
  params: Promise<{ subject: string; teacher: string }>;
}) {
  const { subject, teacher } = await params;

  const subjects = JSON.parse(await getSubjects()) as Subject[];
  const selectedSubject = subjects.find(
    (s) => encodeURIComponent(s.name) == subject
  );

  if (!selectedSubject) {
    return <div className="w-full flex justify-center">Subject not found</div>;
  }

  let teachers = selectedSubject.teachers;
  const selectedTeacher = teachers.find(
    (t) => encodeURIComponent(t.name) == teacher
  );

  if (!selectedTeacher) {
    return <div className="w-full flex justify-center">Teacher not found</div>;
  }

  const concepts = [];

  for (const x of selectedTeacher.concepts) {
    concepts.push(JSON.parse(await getConcepts(x)) as Concept);
  }

  return <List concepts={concepts.flat()} teacher={teacher} />;
}

