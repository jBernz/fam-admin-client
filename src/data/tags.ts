import { Tag } from 'fam-types'

export async function getAllTags():Promise<Tag[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tags/`,{cache:'no-cache'})
  return res.json()
}

export async function postTag(payload:Tag):Promise<Tag> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tags/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
  return res.json()
}

export async function deleteTag(id:string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tags/${id}`, {
    method: 'delete'
  })
  return res
}