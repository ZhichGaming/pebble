import client from "@/lib/mongodb/client";
import { Concept } from "../mongodb/schema";

export async function uploadImage(image: string) {
  const res = await client.db("public").collection("images").insertOne({
    imageData: image,
  });

  return res.insertedId;
}

export async function uploadConcept(concept: Omit<Concept, "_id">) {
  const res = await client.db("public").collection("concepts").insertOne({
    name: concept.name,
    explanation: concept.explanation,
    examples: concept.examples,
  });

  return res.insertedId;
}

