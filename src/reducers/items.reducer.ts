import { getIndexOfItemWithId } from "@/utils"
import { EditModel } from "fam-types"

type ItemAction<T> =
| { type: 'SET_ITEMS', payload: T[] }
| { type: 'ADD_ITEM', payload: T }
| { type: 'UPDATE_ITEM', id: string, payload: T }
| { type: 'REMOVE_ITEM', id: string }

export const itemsReducer = <T extends EditModel>(items:T[], action: ItemAction<T>) => {
  switch (action.type) {
    case 'SET_ITEMS': {
      return action.payload
    }
    case 'ADD_ITEM': {
      return items.concat(action.payload)
    }
    case 'UPDATE_ITEM': {
      const index = getIndexOfItemWithId(action.id, items)
      const newItems = [...items]
      newItems[index] = action.payload
      return newItems
    }
    case 'REMOVE_ITEM': {
      const index = getIndexOfItemWithId(action.id, items)
      const newItems = [...items]
      newItems.splice(index,1)
      return newItems
    }
    default: {
      throw Error('Unknown action');
    }
  }
}