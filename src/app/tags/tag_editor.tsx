'use client'

import { FormTileList, ItemsEditor } from "@/components/form_tile_list/form_tile_list"
import { deleteTag, getAllTags, postTag } from "@/data/tags"
import { ItemsProvider } from "@/contexts/items.context"
import { SelectProvider } from "@/contexts/selected_item.context"
import { Tag } from "fam-types"
import { CardDisplay } from "fam-shared-components"
import { FormField } from "@/types"

export default function TagEditor({data}:{data:Tag[]}) {

  const dataType = {
    newItem: {
      _id: '',
      name: '',
      description: ''
    },
    get: getAllTags,
    post: postTag,
    delete: deleteTag
  }

  const tagFields:FormField[] = [
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
      <ItemsProvider dataType={dataType} data={data} fields={tagFields}>
          <ItemsEditor/>
      </ItemsProvider>
    </SelectProvider>
  )
}