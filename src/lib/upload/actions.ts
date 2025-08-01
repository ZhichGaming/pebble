import client from "@/lib/mongodb/client";
import { Concept } from "../mongodb/schema";

export async function uploadImage(image: string) {
  const res = await client.db("public").collection("images").insertOne({
    imageData: image,
  });

  return res.insertedId;
}

export async function uploadConcept(concept: Omit<Concept, "_id">) {
  const existingConcept = await client.db("public").collection("concepts").findOne({ name: concept.name });

  if (existingConcept) {
    await client.db("public").collection("concepts").updateOne(
      { _id: existingConcept._id },
      {
        $set: {
          explanation: concept.explanation,
          examples: concept.examples,
        },
      }
    );
    return existingConcept._id;
  }

  const res = await client.db("public").collection("concepts").insertOne({
    name: concept.name,
    explanation: concept.explanation,
    examples: concept.examples,
  });

  return res.insertedId;
}

export async function addConceptToSubject(subjectName: string, teacherName: string, conceptName: string) {
  const subject = await client.db("public").collection("subjects").findOne({ name: subjectName });
  
  if (!subject) {
    throw new Error("Subject not found");
  }

  await client.db("public").collection("subjects").updateOne(
    { _id: subject._id },
    {
      $addToSet: {
        "teachers.$[teacher].concepts": conceptName,
      },
    },
    {
      arrayFilters: [{ "teacher.name": teacherName }],
    }
  );
}
