'use client'
import { deleteTag } from '@/data/tags'
import { EditModel } from 'fam-types'
import { ReactNode, useState } from 'react'
import { FormFieldsProps } from './form_fields'

type FormTileProps<T extends EditModel> = {
  data: T,
  FormFields: ({data, onFieldChange}:FormFieldsProps<T>) => ReactNode
  update: (itemToUpdate:T, index: number) => void
  remove: (itemToRemove:T) => void
  select: (itemToSelect:T|null) => void
  editable: boolean
  index: number
}

export const FormTile = <T extends EditModel>({data, FormFields, update, remove, select, editable, index}:FormTileProps<T>) => {

  const [state, setState] = useState(data)

  const onFieldChange = (id:string, value:T[keyof T]) => {
    setState({...state, [id]: value as T[keyof T]})
  }

  const handleEditClick = () => {
    select(data)
  }

  const handleDeleteClick = async () => {
    if(state._id != undefined){
      await deleteTag(state._id)
    }
    remove(data)
  }

  const handleSaveClick = async () => {
    update(state, index)
  }

  const handleCancelClick = () => {
    setState(data)
    select(null)
  }

  const hasChanges = () => {
    return JSON.stringify(state) != JSON.stringify(data)
  }
 
  return (
    <div>
      <form className="form">
        <fieldset disabled={!editable}>
          {<FormFields data={state} onFieldChange={onFieldChange} />}
        </fieldset>
        {editable ? 
          <div>
            <button type="button" onClick={handleSaveClick} disabled={!hasChanges()}>Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
          :
          <div>
            <button type="button" className="align-right" onClick={handleEditClick}>Edit</button>
            <button type="button" className="align-right" onClick={handleDeleteClick}>Delete</button>
          </div>
        }
        {hasChanges() ? <div>*</div> : <></>}
      </form>
    </div>
  )
}