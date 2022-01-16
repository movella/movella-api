import { Socket, Server as socketIo } from 'socket.io'

import { Models } from '../services/sequelize'
import { SequelizeModels } from '../typescript'
import { SocketEvents } from '../services/socket'

type AllFurnitureParams = {}

export const furnitureEvents = (
  socket: Socket,
  user: Omit<SequelizeModels.UserAttributes, 'password'>
) => {
  socket.on(SocketEvents.allFurniture, async (params: AllFurnitureParams) => {
    try {
      const furniture = await Models.Furniture.findAll()

      socket.emit(SocketEvents.allFurniture, furniture)
    } catch (error) {
      console.log(error)
    }
  })
}
