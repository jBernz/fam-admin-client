import { ChangeEvent } from "react"
import { FormInputProps } from "./form_input"

interface FormSelectProps extends FormInputProps {
  options: {value: string|number|undefined, name: string}[]
}
export const FormSelect = ({id, label, value, options, onChange, disabled=false}:FormSelectProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    onChange(value)
  }
  return (
    <fieldset className="field" disabled={disabled}>
      <label htmlFor={id}>{label}:</label>
      <select id={id} onChange={handleChange} value={value}>
        {options.map((o,i) => <option value={o.value} key={i}>{o.name}</option>)}
      </select>
    </fieldset>
  )
}