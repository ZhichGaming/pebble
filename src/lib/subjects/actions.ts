import client from "../mongodb/client";

export function getSubjects() {
  const subjects = client.db("public").collection("");
}
