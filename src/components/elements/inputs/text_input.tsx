import { ChangeEvent } from "react"

type TextInputProps = {
  value: string|undefined,
  onChange: (value:string) => void
}
export const TextInput = ({value, onChange}:TextInputProps) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    onChange(newValue)
  }

  return <input onChange={handleChange} value={value != undefined ? value : ''}/>
  
}