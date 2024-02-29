'use client'
import { ReactNode, useState } from 'react'
import { EditModel } from 'fam-types'
import { FormTile } from './form_tile'
import { FormFields } from './form_fields'
import { DataType, postFunctions } from '@/data/post_functions'


type FormTileListProps<T extends EditModel> = {
  data: T[],
  FormFields: FormFields<T>, 
  DisplayComponent?: ({data}:{data:T}) => ReactNode,
  newItem: T
  saveType: DataType
}

export const FormTileList = <T extends EditModel>({data, FormFields, DisplayComponent, newItem, saveType}:FormTileListProps<T>) => {

  const [items, setItems] = useState(data)
  const [selectedItem, setSelectedItem] = useState<T|null>(null)

  const addEmptyItem = () => {
    setItems(items.concat({...newItem}))
  }

  const updateItem = async (itemToUpdate:T, index: number) => {
    const newItem = await postFunctions(saveType)(itemToUpdate)
    const newItems = [...items]
    newItems[index] = newItem as T
    setItems(newItems)
    setSelectedItem(null)
  }

  const removeItem = (itemToRemove:T) => {
    const newItems = items.filter((item) => item !== itemToRemove)
    setItems(newItems)
  }

  const selectItem = (itemToSelect:T|null) => {
    setSelectedItem(itemToSelect)
  }
  console.log(DisplayComponent)
  console.log(selectedItem)
  console.log(FormFields)

  return (
    <div>
      {items.map( (item, i) => {
        return <FormTile
          key={item._id ? item._id : i}
          index={i}
          data={item} 
          update={updateItem}
          remove={removeItem}
          select={selectItem}
          editable={item == selectedItem}
          FormFields={FormFields}
        />
      })}
      {DisplayComponent ? 
        <div>
          {selectedItem ? <DisplayComponent data={selectedItem}/>:<></>}
        </div>
      :<></>}
      <button onClick={addEmptyItem}>Add</button>
    </div>
  )
}