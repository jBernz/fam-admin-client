'use client'
import { Tag } from "fam-types"
import { FormInput } from "../input_components/form_input"
import { FormFields } from "."

export const TagFormFields:FormFields<Tag> = ({data, onFieldChange}) => {
  return(
    <>
      <FormInput 
        id='name'
        label="Name"
        value={data.name} 
        onChange={onFieldChange.bind(null, 'name')} 
      />
      <FormInput 
        id='description'
        label="Description"
        value={data.description} 
        onChange={onFieldChange.bind(null, 'description')} 
      />
    </>
  )
}