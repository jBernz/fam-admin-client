import { Tag } from 'fam-types'
import { useState, useEffect } from "react"
import { getAllTags } from '@/data/tags'

export function useTags() {
  const [tags, setTags] = useState([] as Tag[])
  useEffect(() => {
    const fetchData = async () =>{
      const res = await getAllTags()
      setTags(res)
    }
    fetchData()
  }, [])
  return tags
}