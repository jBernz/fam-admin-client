'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { EditModel } from '../app/types'

export const FormTileList = <T extends EditModel>(
  getAllItems: () => Promise<T[]>, 
  postItem: (model: T) => Promise<T>, 
  deleteItem: (id:string) => void,
  newItem: T
  ) => {

  const [items, setItems] = useState([] as T[])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const payload = await getAllItems()
    setItems(payload)
  }

  const addEmptyItem = () => {
    setItems(items.concat({...newItem}))
  }

  const removeItem = async (index:number) => {
    const id = items[index]._id
    if(id != undefined){
      await deleteItem(id)
    }
    const newItems = [...items]
    newItems.splice(index)
    setItems(newItems)
  }

  const saveItem = async (index: number, item: Omit<T, "_id">) => {
    const payload = await postItem({...items[index], ...item})
    const newItems = [...items]
    newItems[index] = payload
    setItems(newItems)
  }
 
  return (
    <div>
      {items.map( (item, i) => {
        return <FormTile 
          key={item._id} 
          data={item} 
          save={saveItem}
          remove={removeItem}
          index={i}
        />
      })}
      <button onClick={addEmptyItem}>Add</button>
    </div>
  )
}

const removeId = <T extends EditModel>(data:T):Omit<T, "_id"> => {
  const { _id, ...visibleFields } = data
  return visibleFields
}

type FormTileProps<T extends EditModel> = {
  data: T,
  save: (index:number, item:Omit<T, "_id">) => void
  remove: (index:number) => void
  index: number
}

export const FormTile = <T extends EditModel>({data, save, remove, index}:FormTileProps<T>) => {

  const [state, setState] = useState<Omit<T, "_id">>(removeId(data))
  const [editMode, setEditMode] = useState(false)

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setState({...state, [id]: value as T[keyof T]})
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleDeleteClick = async () => {
    await remove(index)
  }

  const handleSaveClick = async () => {
    await save(index, state)
    setEditMode(false)
  }

  const handleCancelClick = () => {
    setState(removeId(data))
    setEditMode(false)
  }
 
  return (
    <div>
      <form className="form">
        <fieldset disabled={!editMode}>
          {(Object.keys(state) as Array<keyof Omit<T, "_id">>).map( field => {
            const f = field as string
            return <div className="field" key={f}>
              <label htmlFor={f}>{f}</label>
              <input id={f} onChange={onFieldChange} value={state[field] as string|number} />
            </div>
            })
          }
        </fieldset>
        {editMode ? 
          <div>
            <button type="button" onClick={handleSaveClick}>Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
          :
          <div>
            <button type="button" className="align-right" onClick={handleEditClick}>Edit</button>
            <button type="button" className="align-right" onClick={handleDeleteClick}>Delete</button>
          </div>
        }
      </form>
    </div>
  )
}