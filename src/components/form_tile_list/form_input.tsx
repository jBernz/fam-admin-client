import { ChangeEvent } from "react"

export type FormInputProps = {
  id: string,
  label: string,
  value: string|number|undefined,
  onChange: (value:string|number) => void,
  type?: string
  disabled?: boolean
}
export const FormInput = ({id, label, value, onChange, type, disabled=false}:FormInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange(value)
  }
  return (
    <fieldset className="field" disabled={disabled}>
      <label htmlFor={id}>{label}:</label>
      <input id={id} onChange={handleChange} value={value != undefined ? value : ''} type={type}/>
    </fieldset>
  )
}