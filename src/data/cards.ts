import { Card, CardType } from 'fam-types'

export async function getAllCards():Promise<Card[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/cards/`, {cache:'no-cache'})
  return res.json()
}

export async function postCard(payload:Card):Promise<Card> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/cards/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...payload, family: payload.family?._id})
  })
  return res.json()
}

export async function deleteCard(id:string, type: CardType) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/cards/${type}/${id}`, {
    method: 'delete'
  })
  return res
}