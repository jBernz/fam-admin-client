import { CardClass } from "../app/types"

export async function getAllCardClasses():Promise<CardClass[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/card_classes/`)
  return res.json()
}

export async function postCardClass(payload:CardClass):Promise<CardClass> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/card_classes/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  return res.json()
}

export async function deleteCardClass(id:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/card_classes/${id}`, {
    method: 'delete'
  })
  return res
}