'use client'
import { itemsReducer } from '@/reducers/items.reducer'
import { getIndexOfItemWithId } from '@/utils'
import { EditModel } from 'fam-types'
import { ReactElement, createContext, useContext, useReducer, useState } from 'react'
import { useSelectedItem } from './selected_item.context'
import { DataType, FormField } from '@/types'

type ItemsProviderProps<T> = {
  children: ReactElement | ReactElement[],
  dataType: DataType<T>
  data: T[]
  fields: FormField[]
}

const ItemsContext = createContext(null as any)
const ItemsUpdateContext = createContext(null as any)

export const ItemsProvider = <T extends EditModel>({children, dataType, data, fields}:ItemsProviderProps<T>) => {
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [localItems, localDispatch] = useReducer(itemsReducer<T>, data)
  const [items, dispatch] = useReducer(itemsReducer<T>, data)
  const [counter, setCounter] = useState(0)

  const {setSelectedItem} = useSelectedItem()

  const fetch = (func: (param?:any)=>Promise<any>) => async (param?: any) => {
    setLoading(true)
    try{
      await func(param)
      setLoading(false)
    } catch(e) {
      setError(e as string)
      setLoading(false)
    }
  }

  const updateItem = (item:T) => {
    localDispatch({type: 'UPDATE_ITEM', id: item._id, payload: item})
  }

  const addItem = () => {
    const newId = `$phID${counter}`
    localDispatch({type: 'ADD_ITEM', payload: {...dataType.newItem, _id: newId}})
    setCounter(counter+1)
    setSelectedItem(newId)
  }

  const saveItem = fetch(async (item:T) => {
    const savedItem = await dataType.post(item)
    if(!getIndexOfItemWithId(savedItem._id, items)){
      dispatch({type: 'ADD_ITEM', payload: savedItem})
      setSelectedItem(savedItem._id)
    }
    localDispatch({type: 'UPDATE_ITEM', id: item._id, payload: savedItem})
  })

  const removeItem = (item:T) => {
    localDispatch({type: 'REMOVE_ITEM', id: item._id})
    if(getIndexOfItemWithId(item._id, items) > -1){
      fetch(async () => {
        await dataType.delete(item)
        dispatch({type: 'REMOVE_ITEM', id: item._id})
      })()
    }
  }

  const revertItem = (id:string) => {
    const previousItem = items.find(v=>v._id===id)
    if(previousItem != undefined){
      localDispatch({type: 'UPDATE_ITEM', id: id, payload: previousItem})
    }
    else throw Error('Unable to find matching item to revert')
  }

  const hasChanges = (id: string) => {
    return JSON.stringify(items.find(v=>v._id===id)) !== JSON.stringify(localItems.find(v=>v._id===id))
  }

  const itemState = {
    loading,
    error,
    items,
    localItems,
    fields
  }

  const updaters = {
    updateItem,
    addItem,
    saveItem,
    removeItem,
    revertItem,
    hasChanges
  }

  return (
    <ItemsContext.Provider value={itemState}> 
      <ItemsUpdateContext.Provider value={updaters}>
        {children}
      </ItemsUpdateContext.Provider>
    </ItemsContext.Provider>
  )
}

export function useItems() {
  return useContext(ItemsContext)
}

export function useItemsUpdate() {
  return useContext(ItemsUpdateContext)
}