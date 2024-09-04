"use client";

import {db} from "@/db/index"
import {redirect} from "next/navigation"
import { useFormState } from "react-dom"
import * as actions from "@/actions/actions"

const SnippetCreatePage = () => {
  const [formState, createSnippetAction] = useFormState(actions.createSnippet, {message: ""})

  return (
    <div>
    <h3>Create snippet</h3>
    <form action={createSnippetAction}>
      <div className="flex gap-4">
        <label>Title</label>
        <input id="title" name="title" className="border"/>
      </div>
      <div className="flex gap-4">
        <label>Code</label>
        <textarea id="code" name="code" className="border" />
      </div>
      <button type="submit" className="border">Submit</button>
    </form>
    <div>{formState.message}</div>
    </div>
  )
}

export default SnippetCreatePage
