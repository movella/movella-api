import * as jwt from 'jsonwebtoken'

import { SequelizeModels } from '../typescript'
import { Server } from 'http'
import { categoryEvents } from '../events/category'
import { furnitureEvents } from '../events/furniture'
import { Server as socketIo } from 'socket.io'

export const socketMessage = (message: string) => ({ message })
export const socketResponse = (message: string, data: Object | any[]) => ({
  message,
  data,
})

export const SocketEvents = {
  allCategories: 'all_categories',
  createCategory: 'create_category',

  allFurniture: 'all_furniture',
  createFurniture: 'create_furniture',

  error: 'error',
}

export const useSocket = (server: Server) => {
  const io = new socketIo(server)

  io.on('connection', (socket) => {
    console.log('Socket client connected')

    const token = socket.request.headers.authorization

    const decoded = jwt.verify(token, process.env.SECRET) as Omit<
      SequelizeModels.UserAttributes,
      'password'
    >

    categoryEvents(socket, decoded)

    furnitureEvents(socket, decoded)
  })
}

// type MessageParams = {
//   chatId: number
//   content: string
// }

// const useMessage = (
//   socket: Socket,
//   user: Omit<SequelizeModels.UserAttributes, 'password'>
// ) => {
//   socket.on('send_message', async (params: MessageParams) => {
//     console.log('message event')
//     try {
//       matches(params.content, 'string', 'Invalid content', {
//         minLength: 1,
//         maxLength: 255,
//       })
//     } catch (error) {
//       console.log(error)
//       return // void next(new HttpException(400, error))
//     }

//     try {
//       if (
//         (await Models.Chat.findOne({
//           where: {
//             id: params.chatId,
//             [Op.or]: [{ user1Id: user.id }, { user2Id: user.id }],
//           },
//         })) === null
//       ) {
//         throw 'Invalid chat'
//       }

//       const message = await Models.Message.create({
//         content: params.content,
//         chatId: params.chatId,
//         userId: user.id,
//       })

//       const recipients = (((await Models.Chat.findAll({
//         where: {
//           id: params.chatId,
//         },
//         include: [
//           {
//             model: Models.User,
//             as: 'user1',
//             foreignKey: 'user1Id',
//             attributes: {
//               exclude: ['password', 'email'],
//             },
//           },
//           {
//             model: Models.User,
//             as: 'user2',
//             foreignKey: 'user2Id',
//             attributes: {
//               exclude: ['password', 'email'],
//             },
//           },
//         ],
//       })) as unknown) as (SequelizeModels.Chat & {
//         user1: Omit<Omit<SequelizeModels.UserAttributes, 'password'>, 'email'>
//         user2: Omit<Omit<SequelizeModels.UserAttributes, 'password'>, 'email'>
//       })[]).map((v) => ({
//         createdAt: v.createdAt,
//         id: v.id,
//         updatedAt: v.updatedAt,
//         user: v.user1.id === user.id ? v.user2 : v.user1,
//         user1Id: v.user1Id,
//         user2Id: v.user2Id,
//       }))

//       recipients.forEach((r) => {
//         clients[r.user.id].emit('new_message', message)
//       })

//       socket.emit('new_message', message)

//       // socket.emit('message_sent', {
//       //   message: 'Message sent',
//       // })
//     } catch (error) {
//       console.log(error)
//       // next(new HttpException(400, 'Invalid data'))
//     }
//   })
// }
