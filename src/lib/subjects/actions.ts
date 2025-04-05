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

export async function getConcepts(name: string[]) {
  const subjects = await client
    .db("public")
    .collection("concepts")
    .find({ ...name })
    .toArray();

  return JSON.stringify(subjects);
}

