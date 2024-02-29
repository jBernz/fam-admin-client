import { FormTileList } from "@/components/form_tile_list/form_tile_list"
import { getAllTags } from "@/data/tags"
import { NavBar } from "@/components/nav_bar"
import { TagFormFields } from "@/components/form_tile_list/form_fields/tag_form_fields"

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
        FormFields={TagFormFields}
        newItem={newTag}
        saveType={'Tag'}
      />
    </main>
  )
}