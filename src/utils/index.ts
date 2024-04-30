export const getIndexOfItemWithId = (id: string,  items: {_id: string}[]) => {
  const i = items.find(i => i._id == id)
  if (i != undefined) {
    return items.indexOf(i)
  } else return -1
}