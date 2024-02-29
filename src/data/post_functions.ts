import { Card, EditModel, Family, Tag } from "fam-types"
import { postCard } from "./cards"
import { postFamily } from "./families"
import { postTag } from "./tags"

type Post<T extends EditModel> = (payload: T)=>Promise<T>

export type DataType = 'Tag'|'Card'|'Family'

export const postFunctions = <T extends EditModel>(dataType: DataType):Post<T> => {
  switch(dataType){
    case 'Tag': return postTag as unknown as Post<T>
    case 'Family': return postFamily as unknown as Post<T>
    case 'Card': return postCard as unknown as Post<T>
    default:
      throw Error('incorrect data type')
  }
}