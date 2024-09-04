import SnippetEditForm from "@/components/snippetEditForm"
import { db } from "@/db"
import { notFound } from "next/navigation";


interface EditSnippetProps {
  params: {
    id: string
  }
}

const EditSnippet = async (props: EditSnippetProps) => {
  const id = parseInt(props.params.id)
  const snippet = await db.snippet.findFirst({
    where: {id}
  })
  console.log("props", props)
  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <h1>Edit snipper {id}</h1>
      <SnippetEditForm snippet={snippet} />
      </div>
  )
}

export default EditSnippet