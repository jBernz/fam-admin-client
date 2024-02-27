import { TagFormTile } from "@/components/form_tile_list/tag_form_tile"
import { FormTileList } from "@/components/form_tile_list"
import { getAllTags } from "@/data/tags"
import { NavBar } from "@/components/nav_bar"

export default async function Families() {

  const familyData = await getAllTags()
  const newTag = {
    _id: undefined,
    name: '',
    description: ''
  }

  return (
    <main>
      <NavBar/>
      <FormTileList 
        data={familyData} 
        TileComponent={TagFormTile}
        newItem={newTag}
      />
    </main>
  )
}