import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import PostShowLoading from "@/components/posts/post-show-loading";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import paths from "@/paths";
import Link from "next/link";
import {Suspense} from "react"

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  }
}

export default function PostShowPage({params}: PostShowPageProps) {


  const {slug, postId} = params;

  return (
  <>
    <Link href={paths.topicShow(slug)}>Go back</Link>
    <Suspense fallback={<PostShowLoading />}>
      <PostShow postId={postId} />
    </Suspense>
    <CommentCreateForm postId={postId} startOpen />
    <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
  </>
  )
}
