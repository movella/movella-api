import { Model, Op, col, fn, literal } from 'sequelize'

import { HttpException } from '../../exceptions/httpexception'
import { Models } from '../../services/sequelize'
import { Router } from 'express'
import { SequelizeModels } from '../../typescript'

export const chatRouter = Router()

chatRouter.post('/all', async (req, res, next) => {
  try {
    // const chats = await Models.Chat.findAll({
    //   where: {
    //     [Op.or]: [{ user1Id: req.user.id }, { user2Id: req.user.id }],
    //   },
    //   include: [
    //     {
    //       model: Models.User,
    //       as: 'user1',
    //       foreignKey: 'user1Id',
    //       attributes: {
    //         exclude: ['password', 'email'],
    //       },
    //     },
    //     {
    //       model: Models.User,
    //       as: 'user2',
    //       foreignKey: 'user2Id',
    //       attributes: {
    //         exclude: ['password', 'email'],
    //       },
    //     },
    //     {
    //       model: Models.Message,
    //       // foreignKey: 'chatId',
    //     },
    //   ],
    // })

    // const _chats: (SequelizeModels.Chat & {
    //   user: Omit<SequelizeModels.User, 'password'>
    //   messages: SequelizeModels.Message[]
    // })[] = chats
    //   .map((chat) => {
    //     return chat.get() as SequelizeModels.Chat & {
    //       user1: Omit<SequelizeModels.User, 'password'>
    //       user2: Omit<SequelizeModels.User, 'password'>
    //       messages: SequelizeModels.Message[]
    //     }
    //   })
    //   .map((chat) => ({
    //     createdAt: chat.createdAt,
    //     id: chat.id,
    //     updatedAt: chat.updatedAt,
    //     user: chat.user1Id === req.user.id ? chat.user2 : chat.user1,
    //     user1Id: chat.user1Id,
    //     user2Id: chat.user2Id,
    //     messages: chat.messages,
    //   }))

    res.json([])
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

chatRouter.post('/create', async (req, res, next) => {
  const userId = req.body.userId

  try {
    // await Models.Chat.create({
    //   user1Id: req.user.id,
    //   user2Id: userId,
    // })

    res.json({
      message: 'Chat created',
    })
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

// chatRouter.post('/delete', async (req, res, next) => {
//   const id = req.body.id

//   try {
//     await Models.Comment.destroy({
//       where: {
//         id: id,
//         userId: req.user.id,
//       },
//     })

//     res.json({
//       message: 'Comment deleted',
//     })
//   } catch (error) {
//     next(new HttpException(400, 'Invalid data'))
//   }
// })
