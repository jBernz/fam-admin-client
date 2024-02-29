import { FormTileList } from "@/components/form_tile_list/form_tile_list"
import { getAllFamilies, postFamily } from "@/data/families"
import { NavBar } from "@/components/nav_bar"
import { FamilyFormFields } from "@/components/form_tile_list/form_fields/family_form_fields"

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
        FormFields={FamilyFormFields}
        newItem={newFamily}
        saveType={'Family'}
      />
    </main>
  )
}

