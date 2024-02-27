'use client'
import { postTag, deleteTag } from '@/data/tags'
import { Tag } from 'fam-types'
import { useState } from 'react'
import { FormTile } from '.'
import { FormInput } from './form_input'

export const TagFormTile:FormTile<Tag> = ({data, update, remove}) => {

  const [state, setState] = useState(data)
  const [editMode, setEditMode] = useState(false)

  const onFieldChange = (id:string, value:string|number) => {
    setState({...state, [id]: value as Tag[keyof Tag]})
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleDeleteClick = async () => {
    if(state._id != undefined){
      await deleteTag(state._id)
    }
    remove(data)
  }

  const handleSaveClick = async () => {
    const newData = await postTag(state)
    setEditMode(false)
    update(data, newData)
  }

  const handleCancelClick = () => {
    setState(data)
    setEditMode(false)
  }
 
  return (
    <div>
      <form className="form">
        <fieldset disabled={!editMode}>
          <FormInput 
            id='name'
            label="Name"
            value={state.name} 
            onChange={onFieldChange.bind(null, 'name')} 
          />
          <FormInput 
            id='description'
            label="Description"
            value={state.description} 
            onChange={onFieldChange.bind(null, 'description')} 
          />
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