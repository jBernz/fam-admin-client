import { Family } from 'fam-types'
import { getAllFamilies } from "@/data/families"
import { useState, useEffect } from "react"

export function useFamilies() {
  const [families, setFamilies] = useState([] as Family[])
  useEffect(() => {
    const fetchData = async () =>{
      const res = await getAllFamilies()
      setFamilies(res)
    }
    fetchData()
  }, [])
  return families
}