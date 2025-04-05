"use server";

import client from "@/lib/mongodb/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };

  // if (error) {
  //   redirect("/error");
  // }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };

  // if (error) {
  //   redirect("/error");
  // }

  revalidatePath("/", "layout");
  redirect("/");
}

