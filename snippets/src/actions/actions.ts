// this file contains all server actions. Having all server actions in one file has benefits:
//1. You can import and use server actions in all components(client componente too!).
//2. Code reuse is much simpler.

"use server";

import {db} from "@/db"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: {id},
    data: {code}
  })

  //rebuild cache of snippet details route, when you change a snippet
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export const deleteSnippet = async(id: number) => {
  await db.snippet.delete({
    where: {id},
  })

  //rebuild cache on home page to reflect changes
  revalidatePath("/");
  redirect(`/`);
}

export const createSnippet = async (formState: {message: string}, formData: FormData) => {
  //check input
  const title = formData.get('title') as string;
  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title mus be longer"
    }
  }
  const code = formData.get('code') as string;
  if (typeof code !== "string" || code.length < 3) {
    return {
      message: "code mus be longer"
    }
  }

  try {
    //create a new record in DB
    const snippet = await db.snippet.create({
      data: {
        title,
        code
      }
    })
  } catch(err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message
      }
    } else {
      return {
        message: "Something went wrong"
      }
    }
  }
  
  //rebuild cache on home page to reflect changes
  revalidatePath("/");
  //redirect to home
  redirect("/");
}