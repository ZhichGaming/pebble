"use server";

import client from "../mongodb/client";

export async function getSubjects() {
  const subjects = await client
    .db("public")
    .collection("subjects")
    .find({})
    .toArray();

  return JSON.stringify(subjects);
}

export async function getConceptsByTeacher(subjectName: string, teacherName: string): Promise<string> {
  const subject = await client
    .db("public")
    .collection("subjects")
    .findOne({ name: subjectName });

  if (!subject) {
    throw new Error("Could not get concepts, as subject could not be found");
  }

  const conceptNames = subject.teachers.find((t: any) => t.name === teacherName)?.concepts;
  if (conceptNames === undefined) {
    throw new Error("Could not get concepts, as teacher could not be found");
  }

  const concepts = await client
    .db("public")
    .collection("concepts")
    .find({ name: { $in: conceptNames } })
    .toArray();

  return JSON.stringify(concepts);
}

export async function getConcept(name: string): Promise<string> {
  const concept = await client
    .db("public")
    .collection("concepts")
    .findOne({ name });

  return JSON.stringify(concept);
}

