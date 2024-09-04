import {db} from "@/db";
import { notFound } from "next/navigation";

interface PostShowProps {
  postId: string
}

export default async function PostShow({postId}: PostShowProps) {
  //added this line to demostrate Suspense component effect.
  // Initially the suspense fallback component is rendered in browser. Only after the timeout the PostShow component is rendered.
  await new Promise(resolve => setTimeout(resolve, 2500))

  const post = await db.post.findFirst({
    where: {id:postId}
  })
  if (!post){
    notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
