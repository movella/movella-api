import { Model, Op } from 'sequelize'

import { HttpException } from '../../exceptions/httpexception'
import { Models } from '../../services/sequelize'
import { Router } from 'express'
import { SequelizeModels } from '../../typescript'

export const friendRouter = Router()

// router.post('/send', async (req, res, next) => {
//   const requesteeId = req.body.requesteeId

//   try {
//   } catch (error) {
//     return void next(new HttpException(400, error))
//   }

//   try {
//     await Models.FriendRequest.create<Model<SequelizeModels.FriendRequest, {}>>({
//       requesterId: req.user.id,
//       requesteeId: requesteeId,
//     })

//     res.json({
//       message: 'Request sent',
//     })
//   } catch (error) {
//     console.log(error)
//     next(new HttpException(400, 'Invalid data'))
//   }
// })

// router.post('/cancel', async (req, res, next) => {
//   const id = req.body.id

//   try {
//   } catch (error) {
//     return void next(new HttpException(400, error))
//   }

//   try {
//     await Models.FriendRequest.destroy({
//       where: {
//         [Op.and]: {
//           requesterId: req.user.id,
//           id: id,
//         },
//       },
//     })

//     res.json({
//       message: 'Request cancelled',
//     })
//   } catch (error) {
//     console.log(error)
//     next(new HttpException(400, 'Invalid data'))
//   }
// })

friendRouter.post('/remove', async (req, res, next) => {
  const id = req.body.id

  try {
  } catch (error) {
    return void next(new HttpException(400, error))
  }

  try {
    // await Models.Friend.destroy({
    //   where: {
    //     [Op.or]: [
    //       {
    //         [Op.and]: {
    //           id: id,
    //           user1Id: req.user.id,
    //         },
    //         [Op.and]: {
    //           id: id,
    //           user2Id: req.user.id,
    //         },
    //       },
    //     ],
    //   },
    // })

    res.json({
      message: 'Friend removed',
    })
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

// router.post('/accept', async (req, res, next) => {
//   const id = req.body.id

//   try {
//   } catch (error) {
//     return void next(new HttpException(400, error))
//   }

//   try {
//     const request = await Models.FriendRequest.findOne<
//       Model<
//         SequelizeModels.FriendRequest & {
//           requesterUser: Omit<SequelizeModels.User, 'password'>
//           requesteeUser: Omit<SequelizeModels.User, 'password'>
//         },
//         {}
//       >
//     >({
//       where: {
//         [Op.and]: {
//           requesteeId: req.user.id,
//           id: id,
//         },
//       },
//       include: [
//         {
//           model: Models.User,
//           as: 'requesterUser',
//           foreignKey: 'requesterId',
//           attributes: {
//             exclude: ['password'],
//           },
//         },
//         {
//           model: Models.User,
//           as: 'requesteeUser',
//           foreignKey: 'requesteeId',
//           attributes: {
//             exclude: ['password'],
//           },
//         },
//       ],
//     })

//     await Models.Friend.create<Model<SequelizeModels.Friend, {}>>({
//       user1Id: request.getDataValue('requesterId'),
//       user2Id: request.getDataValue('requesteeId'),
//     })

//     await request.destroy()

//     res.json({
//       message: 'Request accepted',
//     })
//   } catch (error) {
//     console.log(error)
//     next(new HttpException(400, 'Invalid data'))
//   }
// })

friendRouter.post('/all', async (req, res, next) => {
  try {
    // const friends = await Models.Friend.findAll({
    //   where: {
    //     [Op.or]: {
    //       user1Id: req.user.id,
    //       user2Id: req.user.id,
    //     },
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
    //   ],
    // })

    // const _friends = friends
    //   .map(
    //     (friend) =>
    //       friend.get() as SequelizeModels.Friend & {
    //         user1: Omit<SequelizeModels.User, 'password'>
    //         user2: Omit<SequelizeModels.User, 'password'>
    //       }
    //   )
    //   .map<
    //     Omit<Omit<SequelizeModels.Friend, 'user1Id'>, 'user2Id'> & {
    //       user: Omit<SequelizeModels.User, 'password'>
    //     }
    //   >((friend) => ({
    //     createdAt: friend.createdAt,
    //     id: friend.id,
    //     updatedAt: friend.updatedAt,
    //     user: req.user.id === friend.user1.id ? friend.user2 : friend.user1,
    //   }))

    res.json([])
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

// router.post('/sent', async (req, res, next) => {
//   try {
//     const sent = await Models.FriendRequest.findAll({
//       where: {
//         requesterId: req.user.id,
//       },
//       include: [
//         {
//           model: Models.User,
//           as: 'requesterUser',
//           foreignKey: 'requesterId',
//           attributes: {
//             exclude: ['password'],
//           },
//         },
//         {
//           model: Models.User,
//           as: 'requesteeUser',
//           foreignKey: 'requesteeId',
//           attributes: {
//             exclude: ['password'],
//           },
//         },
//       ],
//     })

//     res.json(sent)
//   } catch (error) {
//     next(new HttpException(400, 'Invalid data'))
//   }
// })
