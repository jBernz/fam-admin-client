import dynamic from "next/dynamic"
import { MultiValue } from "react-select"
const ReactSelect = dynamic(() => import("react-select"), { ssr: false })

interface FormMultiSelectProps {
  id: string,
  label: string,
  type?: string
  disabled?: boolean,
  options: {value: string|undefined, label: string}[],
  values: {value: string|undefined, label: string}[]|undefined,
  onChange: (values:(string|undefined)[]) => void, 
}
export const FormMultiSelect = ({id, label, values, options, onChange, disabled=false}:FormMultiSelectProps) => {
  const handleChange = (newValue:MultiValue<{ value: string|undefined; label: string; }>) => {
    onChange(newValue.map(n=>n.value))
  }
  return (
    <fieldset className="field" disabled={disabled}>
      <label>{label}:</label>
      <ReactSelect
        id={id}
        value={values}
        isMulti
        name={label}
        options={options} 
        isDisabled={disabled}
        onChange={handleChange as (newValue: unknown) => void}
      />
    </fieldset>
  )
}