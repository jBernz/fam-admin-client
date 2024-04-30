'use client'

import { ReactElement, createContext, useContext, useState } from 'react'

const SelectedItemContext = createContext(null as any)

export const SelectProvider = ({children}:{children:ReactElement}) => {
  
  const [selectedItem, setSelectedItem] = useState('')

  const deselectItem = () => {
    setSelectedItem('')
  }

  return (
    <SelectedItemContext.Provider value={{selectedItem, setSelectedItem, deselectItem}}> 
        {children}
    </SelectedItemContext.Provider>
  )
}

export function useSelectedItem() {
  return useContext(SelectedItemContext)
}