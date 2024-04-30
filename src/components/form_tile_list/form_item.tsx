import { ReactElement } from 'react'
import { NumberInput } from '../elements/inputs/number_input'
import { TextInput } from '../elements/inputs/text_input'
import { Button } from '../elements/button'
import { useItemsUpdate } from '@/contexts/items.context'
import { useSelectedItem } from '@/contexts/selected_item.context'
import { FormField } from '@/types'
import { FormSelect } from '../elements/inputs/form_select'
import { FormMultiSelect } from '../elements/inputs/form_multiselect'


type FormItemProps<T> = {
  data: T,
  fields: FormField[]
}

export const FormItem = <T extends {[key:string]: any}>({data, fields}:FormItemProps<T>) => {

  const {
    updateItem,
    saveItem,
    removeItem,
    revertItem,
    hasChanges
  } = useItemsUpdate()

  const {deselectItem} = useSelectedItem()

  const onFieldChange = (field:string, value:any) => {
    updateItem({...data, [field]: value})
    console.log(data)
  }
  const handleSaveClick = () => {
    saveItem(data)
  }
  const handleRevertClick = () => {
    revertItem(data._id)
  }
  const handleDeleteClick = () => {
    removeItem(data)
  }
  const handleCloseClick = () => {
    deselectItem()
  }

  const itemsHasChanges = hasChanges(data._id)
 
  return (
    <form>
      {fields.map( field => {
        let input
        const onChange = onFieldChange.bind(null, field.key.toString())
        switch(field.type){
          case 'text': input = <TextInput value={data[field.key]?.toString()} onChange={onChange} />; break
          case 'number': input = <NumberInput value={Number(data[field.key])} onChange={onChange} />; break
          case 'select': input = <FormSelect value={data[field.key]} options={field.options} onChange={onChange} />; break
          case 'multiselect': input = <FormMultiSelect values={data[field.key]} options={field.options} onChange={onChange} />; break
        }
        if(input != undefined){
          return (
            <InputRow key={field.key.toString()} label={field.label}>
              {input}
            </InputRow>
          )
        }
      })}
      <ButtonBox>
        <Button onClick={handleSaveClick} disabled={!itemsHasChanges}>Save</Button>
        {itemsHasChanges ? <Button onClick={handleRevertClick}>Revert</Button> : <></>}
        <Button onClick={handleDeleteClick}>Delete</Button>
        <Button onClick={handleCloseClick}>Close</Button>
      </ButtonBox>
    </form>
  )
}


export const ClosedFormItem = <T extends {[key:string]: string|number}>({data, fields}:FormItemProps<T>) => {

  const {setSelectedItem} = useSelectedItem()

  const handleEditClick = () => {
    setSelectedItem(data._id)
  }

  return (
    <div>
      {fields.map( field => {
        if(field.showOnClose) return (
          <InputRow key={field.key.toString()} label={field.label}>
            <span>{data[field.key]}</span>
          </InputRow>
        ) 
      })}
      <ButtonBox>
        <Button onClick={handleEditClick}>Edit</Button>
      </ButtonBox>
    </div>
  )
}

const InputRow = ({label, children}:{
  label: string,
  children: ReactElement
}) => {
  return (
    <>
      <label className='w-1/2 inline-block text-right'>{label}:</label>
      {children}
    </>
  )
}

const ButtonBox = ({children}:{
  children: ReactElement | ReactElement[]
}) => {
  return (
    <div className='w-full flex'>
      {children}
    </div>
  )
}

