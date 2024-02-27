import { Family } from 'fam-types'

export async function getAllFamilies():Promise<Family[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/families/`,{cache:'no-cache'})
  return res.json()
}

export async function postFamily(payload:Family):Promise<Family> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/families/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  return res.json()
}

export async function deleteFamily(id:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/families/${id}`, {
    method: 'delete'
  })
  return res
}