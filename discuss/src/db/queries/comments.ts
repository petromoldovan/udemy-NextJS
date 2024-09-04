import type { Comment } from "@prisma/client";
import {db} from "@/db";
import { comment } from "postcss";

export type CommentWithAuthor = (
  Comment & {
    user: {
      name: string | null;
      image: string | null;
    }}
)

export function fetchCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
  return db.comment.findMany({
    where: {postId},
    //get extra data from other tables
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}
