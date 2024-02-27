import { FamilyFormTile } from "@/components/form_tile_list/family_form_tile"
import { FormTileList } from "@/components/form_tile_list"
import { getAllFamilies } from "@/data/families"
import { NavBar } from "@/components/nav_bar"

export default async function Families() {

  const familyData = await getAllFamilies()
  const newFamily = {
    _id: undefined,
    name: '',
    description: ''
  }

  return (
    <main>
      <NavBar/>
      <FormTileList 
        data={familyData} 
        TileComponent={FamilyFormTile}
        newItem={newFamily}
      />
    </main>
  )
}

