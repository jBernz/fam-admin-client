import { ChangeEvent } from "react"

type FormSelectProps = {
  value: string|undefined
  options: {value: string, name: string}[]
  onChange: (value:string) => void
}
export const FormSelect = ({value, options, onChange}:FormSelectProps) => {

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    onChange(value)
  }

  return (
    <select onChange={handleChange} value={value}>
      {options.map((o,i) => <option value={o.value} key={i}>{o.name}</option>)}
    </select>
  )
}