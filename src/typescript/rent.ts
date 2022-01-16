import { Model, Optional } from 'sequelize/dist'

export type RentAttributes = {
  deliveryCost: number
  description?: string
  endDate: Date
  furnitureId: number
  monthlyCost: number
  name: string
  paymentKey: string
  picture: string
  startDate: Date
  userId: number

  id: number
  updatedAt: Date
  createdAt: Date
}

export type RentCreationAttributes = Optional<
  RentAttributes,
  'createdAt' | 'id' | 'updatedAt'
>

export type RentInstance = Model<RentAttributes, RentCreationAttributes> &
  RentAttributes
