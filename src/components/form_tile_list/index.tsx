'use client'
import { ReactElement, useState } from 'react'
import { EditModel } from 'fam-types'

type FormTileProps<T extends EditModel> = {
  data: T,
  update: (itemToUpdate:T, updatedItem:T) => void
  remove: (itemToRemove:T) => void
}

export type FormTile<T extends EditModel> = ({}:FormTileProps<T>) => ReactElement<any, any>

type FormTileListProps<T extends EditModel> = {
  data: T[],
  TileComponent: FormTile<T>, 
  newItem: T
}

export const FormTileList = <T extends EditModel>({data, TileComponent, newItem}:FormTileListProps<T>) => {

  const [items, setItems] = useState(data)

  const addEmptyItem = () => {
    setItems(items.concat({...newItem}))
  }

  const updateItem = (itemToUpdate:T, updatedItem: T) => {
    const index = items.indexOf(itemToUpdate)
    const newItems = [...items]
    newItems[index] = updatedItem
    setItems(newItems)
  }

  const removeItem = (itemToRemove:T) => {
    const newItems = items.filter((item) => item !== itemToRemove)
    setItems(newItems)
  }
 
  return (
    <div>
      {items.map( (item, i) => {
        return <TileComponent 
          key={item._id ? item._id : i} 
          data={item} 
          update={updateItem}
          remove={removeItem}
        />
      })}
      <button onClick={addEmptyItem}>Add</button>
    </div>
  )
}