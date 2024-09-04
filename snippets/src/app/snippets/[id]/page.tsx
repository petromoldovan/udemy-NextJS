import {db} from "@/db/index"
import Link from "next/link"
import {notFound} from "next/navigation"
import * as actions from "@/actions/actions"

interface SnipperDetailsProps {
  params: {
    id: string
  }
}

const SnippetDetails = async (props: SnipperDetailsProps) => {
  const id = parseInt(props.params.id)
  const snippet = await db.snippet.findFirst({
    where: {id}
  })
  if (!snippet) {
    return notFound();
  }

const deleteSnippetAction = actions.deleteSnippet.bind(null, id);

  return <div>
    <h1>Name: {snippet.title}</h1>
    <div>
      <Link href={`/snippets/${snippet.id}/edit`} className="border">Edit</Link>
      <form action={deleteSnippetAction}>
        <button className="border">Delete</button>
      </form>
    </div>
    <div>
      <code>{snippet.code}</code>
    </div>
  </div>
}

//By default, routes(/snippets/[id]) with parameters are dynamic and not cached. This function caches dynamic routes(snippet/[id]) when building a project for prod:
//nmp run build.
//Do not forget to trigger `revalidatePath` to update cache, when something changes.
export const generateStaticParams = async() => {
  const snippets = await db.snippet.findMany();

  return snippets.map(snippet => {
    return {
      id: snippet.id.toString()
    }
  })
}

export default SnippetDetails
