'use client'
import { getAllCardClasses, postCardClass, deleteCardClass } from '@/data/card_classes'
import { FormTileList } from './form_tile_list'

export const CardClassTileList = () => {
  return FormTileList(
    getAllCardClasses, 
    postCardClass, 
    deleteCardClass, 
    {name: '', description: ''}
  )
}