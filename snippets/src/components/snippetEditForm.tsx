"use client";

import type {Snippet} from "@prisma/client"
import Editor from "@monaco-editor/react";
import {useState} from 'react';
import * as actions from "@/actions/actions";

interface SnippetEditFormProps {
  snippet: Snippet
}

const SnippetEditForm = ({snippet}: SnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);
  const onChange = (value: string = "") => {
    console.log(value)
    setCode(value);
  }

  const handleChange = actions.editSnippet.bind(null, snippet.id, code)

  return (
    <div>
      <Editor 
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        onChange={onChange}
      />
      <form action={handleChange}>
        <button className="border" >Save</button>
      </form>
    </div>
  )
}

export default SnippetEditForm
