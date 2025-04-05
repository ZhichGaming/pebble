import NavigationBar from "@/components/NavigationBar";
import { Subject, User } from "@/lib/mongodb/schema";
import { ObjectId } from "mongodb";
import React from "react";
import Image from 'next/image'
import userImagePath from "@/assets/user.png";
import cubeImagePath from "@/assets/3d-cube.png";

export default function HomePage() {
  const user: User = {
		_id: new ObjectId(),
		email: "user1@example.com",
		password: "password1",
		salt: "salt1",
		identity: {
			username: "user1",
			firstname: "John",
			lastname: "Doe",
		},
		uploads: [new ObjectId(), new ObjectId(), new ObjectId()],
		createdAt: new Date(),
	};

  const subjects: Subject[] = [
    {
      _id: new ObjectId(),
      name: "Mathematics",
      teachers: [{
        name: "Mr. Smith",
        concepts: [],
      }, {
        name: "Jeb",
        concepts: [],
      }, {
        name: "Mr. Hoj",
        concepts: [],
      }],
    },{
      _id: new ObjectId(),
      name: "Mathematics",
      teachers: [{
        name: "Mr. Smith",
        concepts: [],
      }, {
        name: "Jeb",
        concepts: [],
      }, {
        name: "Mr. Hoj",
        concepts: [],
      }],
    },
		{
      _id: new ObjectId(),
      name: "Mathematics",
      teachers: [{
        name: "Mr. Smith",
        concepts: [],
      }, {
        name: "Jeb",
        concepts: [],
      }, {
        name: "Mr. Hoj",
        concepts: [],
      }],
    },
		{
      _id: new ObjectId(),
      name: "Mathematics",
      teachers: [{
        name: "Mr. Smith",
        concepts: [],
      }, {
        name: "Jeb",
        concepts: [],
      }, {
        name: "Mr. Hoj",
        concepts: [],
      }],
    },
		{
      _id: new ObjectId(),
      name: "Mathematics",
      teachers: [{
        name: "Mr. Smith",
        concepts: [],
      }, {
        name: "Jeb",
        concepts: [],
      }, {
        name: "Mr. Hoj",
        concepts: [],
      }],
    },
		{
      _id: new ObjectId(),
      name: "Mathematics",
      teachers: [{
        name: "Mr. Smith",
        concepts: [],
      }, {
        name: "Jeb",
        concepts: [],
      }, {
        name: "Mr. Hoj",
        concepts: [],
      }],
    },

  ];

  return (
		<div className="flex flex-col items-center justify-center w-screen h-screen bg-[#E4E4DE] text-black">
			<NavigationBar />
			<div className="flex flex-grow w-screen p-8 overflow-scroll">
				{/* Left Column */}
				<div className="flex-grow">
					<h2 className="text-xl font-bold mb-4">Subjects</h2>
					{subjects.map((subject) => (
						<div key={subject._id.toString()} className="bg-white rounded-lg shadow p-5 mb-4">
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
									<div key={teacher.name} className="mt-2 text-sm border rounded-full px-2 hover:bg-gray-100 mr-2">
										<p>{teacher.name}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Vertical Separator */}
				<div className="w-px bg-gray-300 mx-8"></div>

				{/* Right Column */}
				<div className="flex-1 w-64">
					<h2 className="text-xl font-bold mb-4">Your Uploads</h2>
					<div className="grid grid-cols-2 gap-4">
						{user.uploads.map((upload) => (
							<div key={user._id?.toString()} className="bg-white rounded-lg shadow p-5 mb-4">
								<p>{upload.toString()}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
  );
};
