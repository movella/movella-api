import * as yup from 'yup'

import { SocketEvents, socketMessage, socketResponse } from '../services/socket'

import { CustomException } from '../exceptions/customexception'
import { Models } from '../services/sequelize'
import { SequelizeModels } from '../typescript'
import { Socket } from 'socket.io'

type AllFurnitureParams = {}

type RecommendedParams = {}

type CreateFurnitureParams = {
  category: number
  depth: number
  height: number
  monthlyCost: number
  name: string
  width: number
}

export const furnitureEvents = (
  socket: Socket,
  user: Omit<SequelizeModels.UserAttributes, 'password'>
) => {
  socket.on(
    SocketEvents.allFurniture,
    async (params: AllFurnitureParams, callback?: Function) => {
      try {
        const furniture = await Models.Furniture.findAll()

        if (typeof callback === 'function')
          callback(socketResponse('Listing furniture.', furniture))
      } catch (error) {
        if (error instanceof CustomException) {
          if (typeof callback === 'function')
            return callback(socketMessage(error.message))
        }

        console.log(error)

        if (typeof callback === 'function')
          callback(socketMessage('Something went wrong.'))
      }
    }
  )

  socket.on(
    SocketEvents.recommended,
    async (params: RecommendedParams, callback?: Function) => {
      try {
        const furniture = await Models.Furniture.findAll()

        if (typeof callback === 'function')
          callback(socketResponse('Listing furniture.', furniture))
      } catch (error) {
        if (error instanceof CustomException) {
          if (typeof callback === 'function')
            return callback(socketMessage(error.message))
        }

        console.log(error)

        if (typeof callback === 'function')
          callback(socketMessage('Something went wrong.'))
      }
    }
  )

  socket.on(
    SocketEvents.createFurniture,
    async (params: CreateFurnitureParams, callback?: Function) => {
      try {
        // if (user.access === 'default') {
        //   throw new CustomException('Unauthorized.')
        // }

        const schema = yup.object().shape({
          category: yup.number(),
          depth: yup.number(),
          height: yup.number(),
          monthlyCost: yup.number(),
          name: yup.string(),
          width: yup.number(),
        })

        if (!(await schema.isValid(params))) {
          throw new CustomException('Invalid data.')
        }

        const category = await Models.Category.findByPk(params.category)

        if (!category) {
          throw new CustomException('Category not found.')
        }

        await Models.Furniture.create({
          available: true,
          categoryId: category.get().id,
          depth: params.depth,
          height: params.height,
          monthlyCost: params.monthlyCost,
          name: params.name,
          picture: 'default-furniture',
          userId: user.id,
          width: params.width,
        })

        if (typeof callback === 'function')
          callback(socketMessage('Furniture created.'))
      } catch (error) {
        if (error instanceof CustomException) {
          if (typeof callback === 'function')
            return callback(socketMessage(error.message))
        }

        console.log(error)
        if (typeof callback === 'function')
          callback(socketMessage('Something went wrong.'))
      }
    }
  )
}
