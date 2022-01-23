import * as yup from 'yup'

import { SocketEvents, socketMessage, socketResponse } from '../services/socket'

import { CustomException } from '../exceptions/customexception'
import { Models } from '../services/sequelize'
import { SequelizeModels } from '../typescript'
import { Socket } from 'socket.io'

type AllCategoriesParams = {}

type CreateCategoryParams = {
  name: string
}

export const categoryEvents = (
  socket: Socket,
  user: Omit<SequelizeModels.UserAttributes, 'password'>
) => {
  socket.on(
    SocketEvents.allCategories,
    async (params: AllCategoriesParams, callback: Function) => {
      try {
        const categories = await Models.Category.findAll()

        callback(socketResponse('Listing categories.', categories))
      } catch (error) {
        if (error instanceof CustomException) {
          return callback(socketMessage(error.message))
        }

        console.log(error)

        return callback(socketMessage('Something went wrong.'))
      }
    }
  )

  socket.on(
    SocketEvents.createCategory,
    async (params: CreateCategoryParams, callback: Function) => {
      try {
        // if (user.access !== 'admin') {
        //   throw new CustomException('Unauthorized.')
        // }

        const schema = yup.object().shape({
          name: yup.string(),
        })

        if (!(await schema.isValid(params))) {
          throw new CustomException('Invalid data.')
        }

        await Models.Category.create({
          name: params.name,
        })

        callback(socketMessage('Category created.'))
      } catch (error) {
        if (error instanceof CustomException) {
          return callback(socketMessage(error.message))
        }

        console.log(error)

        return callback(socketMessage('Something went wrong.'))
      }
    }
  )
}
