import Link from "next/link";
import {db} from "@/db/index"

//This line disables cache completely. But better approach is to refresh cache(revalidateRoute) whenever you need it. 
//export const dynamic = "force-dynamic";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map(snippet => {
    return (
      <Link key={snippet.id} className="flex justify-between border" href={`/snippets/${snippet.id}`}>
        <div>{snippet.title}</div>
        <div>{snippet.code}</div>
      </Link>
    )
  })

  return (
    <div>
      <div>
        <h1>Snippets</h1>
        <Link href={`/snippets/new`} className="border">New</Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
