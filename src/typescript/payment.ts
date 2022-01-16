import { Model, Optional } from 'sequelize/dist'

export type PaymentAttributes = {
  key: string
  type: string
  userId: number

  id: number
  updatedAt: Date
  createdAt: Date
}

export type PaymentCreationAttributes = Optional<
  PaymentAttributes,
  'createdAt' | 'id' | 'updatedAt'
>

export type PaymentInstance = Model<
  PaymentAttributes,
  PaymentCreationAttributes
> &
  PaymentAttributes
