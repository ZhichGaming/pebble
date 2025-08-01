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

export async function updateConceptExplanation(conceptId: string, explanation: string): Promise<string> {
  const result = await client
    .db("public")
    .collection("concepts")
    .updateOne(
      { _id: new (await import("mongodb")).ObjectId(conceptId) },
      { $set: { explanation } }
    );

  if (result.modifiedCount === 0) {
    throw new Error("Failed to update concept explanation");
  }

  return JSON.stringify({ success: true });
}

export async function addConceptExample(conceptId: string, example: string): Promise<string> {
  const result = await client
    .db("public")
    .collection("concepts")
    .updateOne(
      { _id: new (await import("mongodb")).ObjectId(conceptId) },
      { $push: { examples: example } } as any
    );

  if (result.modifiedCount === 0) {
    throw new Error("Failed to add example to concept");
  }

  return JSON.stringify({ success: true });
}

export async function updateConceptExample(conceptId: string, oldExample: string, newExample: string): Promise<string> {
  const result = await client
    .db("public")
    .collection("concepts")
    .updateOne(
      { _id: new (await import("mongodb")).ObjectId(conceptId) },
      { $set: { "examples.$[elem]": newExample } } as any,
      { arrayFilters: [{ "elem": oldExample }] }
    );

  if (result.modifiedCount === 0) {
    throw new Error("Failed to update example");
  }

  return JSON.stringify({ success: true });
}

export async function deleteConceptExample(conceptId: string, example: string): Promise<string> {
  const result = await client
    .db("public")
    .collection("concepts")
    .updateOne(
      { _id: new (await import("mongodb")).ObjectId(conceptId) },
      { $pull: { examples: example } } as any
    );

  if (result.modifiedCount === 0) {
    throw new Error("Failed to delete example");
  }

  return JSON.stringify({ success: true });
}

