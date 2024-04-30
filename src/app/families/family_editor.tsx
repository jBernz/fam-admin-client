'use client'
import { ItemsEditor } from "@/components/form_tile_list/form_tile_list"
import { ItemsProvider } from "@/contexts/items.context"
import { SelectProvider } from "@/contexts/selected_item.context"
import { CardType, Family } from "fam-types"
import { deleteFamily, getAllFamilies, postFamily } from "@/data/families"
import { FormField } from "@/types"

export default function FamilyEditor({data}:{data:Family[]}) {

  const dataType = {
    newItem: {
      _id: '',
      name: '',
      description: '',
      type: CardType.Attack,
      memory: 0
    },
    get: getAllFamilies,
    post: postFamily,
    delete: deleteFamily
  }

  const familyFields:FormField[] = [
    {
      key: 'name',
      type: 'text',
      label: 'Name',
      showOnClose: true
    },
    {
      key: 'description',
      type: 'text',
      label: 'Description',
      showOnClose: false
    }
  ]

  return (
    <SelectProvider>
      <ItemsProvider dataType={dataType} data={data} fields={familyFields}>
          <ItemsEditor/>
      </ItemsProvider>
    </SelectProvider>
  )
}