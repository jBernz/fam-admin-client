import { CardType } from "fam-types"

type DataType<T> = {
  newItem: T,
  get: ()=>Promise<T[]>,
  post: (payload:T)=>Promise<T>,
  delete: ((item:T)=>Promise<Response>)
}

type Field = {
  key: string
  type: string
  label: string,
  showOnClose: boolean,
  showOnType?: string[]
}

interface TextField extends Field {
  type: 'text',
}

interface NumberField extends Field {
  type: 'number',
}

interface SelectField extends Field {
  type: 'select',
  options: any[]
}

interface MultiSelectField extends Field {
  type: 'multiselect',
  options: any[]
}

type FormField = TextField | NumberField | SelectField | MultiSelectField