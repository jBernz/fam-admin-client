import { getAllCards } from "@/data/cards"
import CardEditor from "./card_editor"
import { getAllFamilies } from "@/data/families"
import { getAllTags } from "@/data/tags"

export default async function Cards() {

  const data = await getAllCards()
  const families = await getAllFamilies()
  const tags = await getAllTags()

  return (
    <CardEditor data={data} families={families} tags={tags}/>
  )
}