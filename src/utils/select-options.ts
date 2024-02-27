export function addEmptyOption(options:{name:string,value:string|number|undefined}[]){
  return [{name: 'None', value: undefined}, ...options]
}

export function mapEnumToOptions(enumObject:{[key: string]: string|number|undefined}){
  return Object.values(enumObject).map((s)=>{return {name:s as string, value:s}})
}

export function createNumberOptions(max:number){
  return Array(max).fill(0,0,max).map((x,i)=>{return {value: i, name: i.toString()}})
}