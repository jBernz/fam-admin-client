'use client'
import { ReactNode } from 'react'
import { EditModel } from 'fam-types'
import { ClosedFormItem, FormItem } from './form_item'
import { Button } from '../elements/button'
import { useItems, useItemsUpdate } from '@/contexts/items.context'
import { useSelectedItem } from '@/contexts/selected_item.context'


export const ItemsEditor = <T extends EditModel>({DisplayComponent}:{DisplayComponent?:({ data }: { data: T}) => ReactNode}) => {

  const {localItems, loading, error} = useItems()
  const {selectedItem} = useSelectedItem()

  const renderDisplayComponent = () => {
    if (!selectedItem.length || DisplayComponent === undefined){
      return <></>
    }
    const data = localItems.find( (item:T) => item._id === selectedItem )
    return <DisplayComponent data={data}/>
  }

  return (
    <div className='flex h-full py-5'>
      {loading ? <div>'Loading...'</div> : null}
      {error ? <div>{error}</div> : null}
      <FormTileList/>
      <div className='flex-[0_0_auto] flex justify-center items-center pl-5 min-w-[340px]'>
        {renderDisplayComponent()}
      </div>
    </div>
  )

}

export const FormTileList = <T extends EditModel>() => {

  const {localItems, fields} = useItems()
  const {addItem} = useItemsUpdate()
  const {selectedItem} = useSelectedItem()

  const handleAddItem = () => {
    addItem()
  }

  console.log(fields)

  return (
    <ul className='flex-[1_1_auto] flex flex-col justify-center items-center border-r pr-5 overflow-auto'>
      {localItems.map( (item:T) => {
        return (
        <li key={item._id} className='w-full mb-2'>
          <ItemTile>
            {item._id == selectedItem ? 
              <FormItem data={item} fields={fields}/>:
              <ClosedFormItem data={item} fields={fields}/>
            }
          </ItemTile>
        </li>
        )
      })}
      <li className='w-full text-center'>
        <Button onClick={handleAddItem}>Add</Button>
      </li>
    </ul>
  )
}

export const ItemTile = ({children}:{
  children: ReactNode
}) => {
  return (
    <div className='p-1 border border-solid border-black rounded'>
      {children}
    </div>
  )
}