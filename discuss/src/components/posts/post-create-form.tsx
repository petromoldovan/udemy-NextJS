"use client";

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@nextui-org/react"
import * as actions from "@/actions/index"
import { useFormState } from "react-dom";
import FormButton from "../common/form-button";

interface PostCreateFromProps {
  slug: string
}

export default function  PostCreateFrom({slug}: PostCreateFromProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null,  slug), 
    {
      errors: {}
    }
);
  
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a post</h3>
            <Input 
              name="title" 
              label="Title" 
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea 
              name="content" 
              label="Content" 
              labelPlacement="outside" 
              placeholder="Content here" 
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />

            {
              formState.errors._form ? <div className="bg-red-200 border border-red-4">{formState.errors._form?.join(', ')}</div> : null
            }

            <FormButton>
              Create Post
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
