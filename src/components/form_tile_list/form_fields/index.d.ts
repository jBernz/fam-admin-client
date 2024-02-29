type FormFieldsProps<T extends EditModel> = {
  data: T,
  onFieldChange: (id:string, value:T[keyof T])=>void
}

export type FormFields<T extends EditModel> = ({}:FormFieldsProps<T>) => ReactElement<any, any>