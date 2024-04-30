import { getAllFamilies } from "@/data/families"
import FamilyEditor from "./family_editor"

export default async function Families() {

  const data = await getAllFamilies()

  return (
    <FamilyEditor data={data}/>
  )
}