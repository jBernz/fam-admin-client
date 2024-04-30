import { getAllTags } from "@/data/tags"
import TagEditor from "./tag_editor"

export default async function Tags() {

  const data = await getAllTags()

  return (
    <TagEditor data={data}/>
  )
}