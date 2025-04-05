"use server";

import client from "@/lib/mongodb/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "@/lib/mongodb/schema";
import { LoginFormSchema, SignupFormSchema } from "@/lib/mongodb/definitions";
import { hash } from "argon2";

export async function login(formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //   };
  // }

  const user = (await client
    .db("auth")
    .collection("users")
    .findOne({ email: validatedFields.data?.username })) as User;

  console.log("user: ", user);

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
  const hashedPassword = hash(salt + validatedFields.data?.password);

  const user = await client
    .db("auth")
    .collection("users")
    .insertOne({
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

