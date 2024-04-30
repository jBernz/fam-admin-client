import { ChangeEvent } from "react"

type NumberInputProps = {
  value: number|undefined,
  onChange: (value:number) => void
}
export const NumberInput = ({value, onChange}:NumberInputProps) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    onChange(Number(newValue))
  }

  return <input value={!Number.isNaN(value) ? value : 0} onChange={handleChange}  type='number'/>
  
}