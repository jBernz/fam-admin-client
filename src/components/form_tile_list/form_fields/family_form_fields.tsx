'use client'
import { Family } from "fam-types"
import { FormInput } from "../input_components/form_input"
import { FormFields } from "."

export const FamilyFormFields:FormFields<Family> = ({data, onFieldChange}) => {
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