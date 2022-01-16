import { Model, Optional } from 'sequelize/dist'

export type CategoryAttributes = {
  name: string

  id: number
  updatedAt: Date
  createdAt: Date
}

export type CategoryCreationAttributes = Optional<
  CategoryAttributes,
  'createdAt' | 'id' | 'updatedAt'
>

export type CategoryInstance = Model<
  CategoryAttributes,
  CategoryCreationAttributes
> &
  CategoryAttributes
