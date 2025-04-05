"use server";

import client from "../mongodb/client";

export async function getSubjects() {
  const subjects = await client
    .db("public")
    .collection("subjects")
    .find({})
    .toArray();

  return subjects;
}

