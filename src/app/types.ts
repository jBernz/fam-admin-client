export type EditModel = {
  _id?: string
}

export interface CardClass extends EditModel {
  name: string
  description?: string
}