"use client";

import { ClientUser, Subject, User } from "@/lib/mongodb/schema";
import React from "react";
import Image from 'next/image'
import userImagePath from "@/assets/user.png";
import cubeImagePath from "@/assets/3d-cube.png";
import Link from "next/link";
import { getUser } from "@/lib/account/actions";
import { getSubjects } from "@/lib/subjects/actions";

export default function HomePage() {
  const [user, setUser] = React.useState<ClientUser | null>(null);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);

  React.useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();

      if (!data) {
        return;
      }

      setUser(data);
    };

    const fetchSubjects = async () => {
      const data = await getSubjects();

      if (!data) {
        return;
      }

      setSubjects(data as Subject[]);
    };

    fetchUser();
    fetchSubjects();
  }, []);

  return (
		<div className="flex flex-col items-center justify-center w-screen h-screen">
			<div className="flex flex-grow w-screen px-8 overflow-y-scroll mt-16">
				{/* Left Column */}
				<div className="flex-grow">
					<h2 className="text-xl font-bold mb-4">Subjects</h2>
					{subjects.map((subject) => (
						<div key={subject._id.toString()} className="bg-white rounded-lg shadow p-5 mb-4 text-[#1B1B1B]">
							<h1 className="font-bold text-xl mb-2">{subject.name}</h1>
							{/* <hr className="my-2" /> */}
							<div className="flex gap-x-4 opacity-60">
								<div className="flex mb-1 items-center">
									<Image src={userImagePath} alt="User" className="w-4 h-4 mr-2" />
									<p>{subject.teachers.length} teachers</p>
								</div>
								<div className="flex mb-1 items-center">
									<Image src={cubeImagePath} alt="Concepts" className="w-4 h-4 mr-2" />
									<p>{subject.teachers.map(t => t.concepts.length).reduce((acc, curr) => curr + acc)} concepts</p>
								</div>
							</div>
							<hr className="my-2" />
							<div className="flex mb-1 items-center">
								<p>Select a Teacher</p>
							</div>
							<div className="flex">
								{subject.teachers.map((teacher) => (
									<Link href={`${subject._id.toString()}/${encodeURIComponent(teacher.name)}`} key={teacher.name} className="mt-2 text-sm border rounded-full px-2 hover:bg-gray-100 mr-2">
										<p>{teacher.name}</p>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Vertical Separator */}
				<div className="sticky top-3 w-px bg-gray-300 mx-8 my-3"></div>

				{/* Right Column */}
				<div className="sticky top-0 flex-1 w-64">
					<h2 className="text-xl font-bold mb-4">Your Uploads</h2>
					<div className="grid grid-cols-2 gap-4">
						{/* {user.uploads.map((upload) => (
							<div key={upload.toString()} className="bg-white rounded-lg shadow p-5 mb-4 text-[#1B1B1B]">
								<p>{upload.toString()}</p>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</div>
  );
};
