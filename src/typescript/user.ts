import { Model, Optional } from 'sequelize/dist'

export type UserAttributes = {
  access: string
  city?: string
  country?: string
  email: string
  line1?: string
  line2?: string
  password: string
  phone?: string
  picture: string
  state?: string
  username: string
  zipCode?: string

  id: number
  updatedAt: Date
  createdAt: Date
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'createdAt' | 'id' | 'updatedAt'
>

export type UserInstance = Model<UserAttributes, UserCreationAttributes> &
  UserAttributes
