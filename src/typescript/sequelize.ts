import {
  CategoryAttributes,
  CategoryCreationAttributes,
  CategoryInstance,
} from './category'
import {
  FurnitureAttributes,
  FurnitureCreationAttributes,
  FurnitureInstance,
} from './furniture'
import {
  PaymentAttributes,
  PaymentCreationAttributes,
  PaymentInstance,
} from './payment'
import { RentAttributes, RentCreationAttributes, RentInstance } from './rent'
import { UserAttributes, UserCreationAttributes, UserInstance } from './user'

export {
  CategoryAttributes,
  CategoryCreationAttributes,
  CategoryInstance,
  FurnitureAttributes,
  FurnitureCreationAttributes,
  FurnitureInstance,
  PaymentAttributes,
  PaymentCreationAttributes,
  PaymentInstance,
  RentAttributes,
  RentCreationAttributes,
  RentInstance,
  UserAttributes,
  UserCreationAttributes,
  UserInstance,
}

export namespace Models {
  // old

  export type Post = {
    id: number
    userId: number
    content: string
    updatedAt: Date
    createdAt: Date
  }
  export type FriendRequest = {
    id: number
    requesterId: number
    requesteeId: number
    updatedAt: Date
    createdAt: Date
  }
  export type Friend = {
    id: number
    user1Id: number
    user2Id: number
    updatedAt: Date
    createdAt: Date
  }
  export type Like = {
    id: number
    userId: number
    postId: number
    updatedAt: Date
    createdAt: Date
  }
  export type Chat = {
    id: number
    user1Id: number
    user2Id: number
    updatedAt: Date
    createdAt: Date
  }
  export type Message = {
    id: number
    content: string
    chatId: number
    userId: number
    updatedAt: Date
    createdAt: Date
  }
}
