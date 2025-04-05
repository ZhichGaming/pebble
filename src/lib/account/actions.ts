"use server";

import client from "@/lib/mongodb/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginFormSchema, SignupFormSchema } from "@/lib/mongodb/definitions";
import bcrypt from "bcryptjs";

export async function login(formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (validatedFields.error) {
    return;
  }

  const user = await client
    .db("auth")
    .collection("users")
    .findOne({ email: validatedFields.data.email });

  if (!user) {
    return;
  }

  const salt = user.salt;
  const hashedPassword = await bcrypt.hash(
    validatedFields.data?.password,
    salt
  );

  console.log(hashedPassword, user.password);
  if (hashedPassword == user.password) console.log("password correct");

  revalidatePath("/home", "layout");
  redirect("/home");
}

export async function signup(formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const salt = generateSalt(32);

  if (validatedFields.error) {
    return validatedFields.error;
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, salt);

  const error = (await client.db("auth").collection("users")).insertOne({
    email: validatedFields.data?.email,
    password: hashedPassword,
    salt: salt,
    identity: {
      username: validatedFields.data?.username,
      firstname: validatedFields.data?.firstname,
      lastname: validatedFields.data?.lastname,
    },
    uploads: [],
    createdAt: new Date(),
  });

  revalidatePath("/home", "layout");
  redirect("/home");
}

export async function getSubjects() {
  const subjects = await client
    .db("public")
    .collection("subjects")
    .find({})
    .toArray();

  console.log("subjects: ", subjects);

  return;
}

function generateSalt(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

