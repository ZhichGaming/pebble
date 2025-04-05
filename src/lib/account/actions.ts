"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { generateSalt } from "./utils";

import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from "@/lib/mongodb/definitions";
import client from "@/lib/mongodb/client";
import { createSession, deleteSession } from "@/lib/mongodb/session";
import { cookies } from "next/headers";

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      payload: formData,
    };
  }

  const user = await client
    .db("auth")
    .collection("users")
    .findOne({ email: validatedFields.data.email });

  if (!user) {
    return {
      message: "No such user exists",
      payload: formData,
    };
  }

  const salt = user.salt;
  const hashedPassword = bcrypt.hashSync(validatedFields.data.password + salt);

  if (hashedPassword == user.password) console.log("password correct");

  createSession({
    _id: user._id,
    email: user.email,
    identity: user.identity,
  });

  redirect("/home");
}

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const salt = generateSalt(32);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      payload: formData,
    };
  }

  const hashedPassword = bcrypt.hashSync(validatedFields.data.password + salt);

  const user = {
    email: validatedFields.data.email,
    password: hashedPassword,
    salt: salt,
    identity: {
      username: validatedFields.data.username,
      firstname: validatedFields.data.firstname,
      lastname: validatedFields.data.lastname,
    },
    uploads: [],
    createdAt: new Date(),
  };

  const response = await client.db("auth").collection("users").insertOne(user);

  await createSession({
    _id: response.insertedId,
    email: user.email,
    identity: user.identity,
  });

  redirect("/home");
}

export async function logout() {
  await deleteSession();
}

export async function getUser() {
  const cookieStore = await cookies();

  const user = cookieStore.get("user")?.value;

  if (!user) {
    return;
  }

  return JSON.parse(user);
}

