import dynamic from "next/dynamic"
import { MultiValue } from "react-select"
const ReactSelect = dynamic(() => import("react-select"), { ssr: false })

interface FormMultiSelectProps {
  disabled?: boolean,
  options: {value: string|undefined, label: string}[],
  values: string[]|undefined,
  onChange: (values:(string|undefined)[]) => void, 
}
export const FormMultiSelect = ({values, options, onChange, disabled=false}:FormMultiSelectProps) => {
  const handleChange = (newValue:MultiValue<{ value: string|undefined; label: string; }>) => {
    console.log(newValue)
    onChange(newValue.map(n=>n.value))
  }
  return (
    <ReactSelect
      value={values?.map(v=>options.find(o=>o.value===v))}
      isMulti
      options={options} 
      isDisabled={disabled}
      onChange={handleChange as (newValue: unknown) => void}/>
  )
}