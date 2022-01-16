import { Model, Optional } from 'sequelize/dist'

export type FurnitureAttributes = {
  available: boolean
  categoryId: number
  depth: number
  description?: string
  height: number
  monthlyCost: number
  name: string
  picture: string
  userId: number
  width: number

  id: number
  updatedAt: Date
  createdAt: Date
}

export type FurnitureCreationAttributes = Optional<
  FurnitureAttributes,
  'createdAt' | 'id' | 'updatedAt'
>

export type FurnitureInstance = Model<
  FurnitureAttributes,
  FurnitureCreationAttributes
> &
  FurnitureAttributes
