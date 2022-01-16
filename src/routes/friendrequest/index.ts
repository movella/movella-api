import { Model, Op } from 'sequelize'

import { HttpException } from '../../exceptions/httpexception'
import { Models } from '../../services/sequelize'
import { Router } from 'express'
import { SequelizeModels } from '../../typescript'

export const friendRequestRouter = Router()

friendRequestRouter.post('/send', async (req, res, next) => {
  const requesteeId = req.body.requesteeId

  try {
  } catch (error) {
    return void next(new HttpException(400, error))
  }

  try {
    // await Models.FriendRequest.create<Model<SequelizeModels.FriendRequest, {}>>({
    //   requesterId: req.user.id,
    //   requesteeId: requesteeId,
    // })

    res.json({
      message: 'Request sent',
    })
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

friendRequestRouter.post('/cancel', async (req, res, next) => {
  const id = req.body.id

  try {
  } catch (error) {
    return void next(new HttpException(400, error))
  }

  try {
    // await Models.FriendRequest.destroy({
    //   where: {
    //     [Op.and]: {
    //       requesterId: req.user.id,
    //       id: id,
    //     },
    //   },
    // })

    res.json({
      message: 'Request cancelled',
    })
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

friendRequestRouter.post('/reject', async (req, res, next) => {
  const id = req.body.id

  try {
  } catch (error) {
    return void next(new HttpException(400, error))
  }

  try {
    // await Models.FriendRequest.destroy({
    //   where: {
    //     [Op.and]: {
    //       requesteeId: req.user.id,
    //       id: id,
    //     },
    //   },
    // })

    res.json({
      message: 'Request rejected',
    })
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

friendRequestRouter.post('/accept', async (req, res, next) => {
  const id = req.body.id

  try {
  } catch (error) {
    return void next(new HttpException(400, error))
  }

  try {
    // const request = await Models.FriendRequest.findOne<
    //   Model<
    //     SequelizeModels.FriendRequest & {
    //       requesterUser: Omit<SequelizeModels.User, 'password'>
    //       requesteeUser: Omit<SequelizeModels.User, 'password'>
    //     },
    //     {}
    //   >
    // >({
    //   where: {
    //     [Op.and]: {
    //       requesteeId: req.user.id,
    //       id: id,
    //     },
    //   },
    //   include: [
    //     {
    //       model: Models.User,
    //       as: 'requesterUser',
    //       foreignKey: 'requesterId',
    //       attributes: {
    //         exclude: ['password', 'email'],
    //       },
    //     },
    //     {
    //       model: Models.User,
    //       as: 'requesteeUser',
    //       foreignKey: 'requesteeId',
    //       attributes: {
    //         exclude: ['password', 'email'],
    //       },
    //     },
    //   ],
    // })

    // await Models.Friend.create<Model<SequelizeModels.Friend, {}>>({
    //   user1Id: request.getDataValue('requesterId'),
    //   user2Id: request.getDataValue('requesteeId'),
    // })

    // await request.destroy()

    res.json({
      message: 'Request accepted',
    })
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

friendRequestRouter.post('/pending', async (req, res, next) => {
  try {
    // const pending = await Models.FriendRequest.findAll({
    //   where: {
    //     requesteeId: req.user.id,
    //   },
    //   include: [
    //     {
    //       model: Models.User,
    //       as: 'requesterUser',
    //       foreignKey: 'requesterId',
    //       attributes: {
    //         exclude: ['password', 'email'],
    //       },
    //     },
    //     {
    //       model: Models.User,
    //       as: 'requesteeUser',
    //       foreignKey: 'requesteeId',
    //       attributes: {
    //         exclude: ['password', 'email'],
    //       },
    //     },
    //   ],
    // })

    res.json([])
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})

friendRequestRouter.post('/sent', async (req, res, next) => {
  try {
    // const sent = await Models.FriendRequest.findAll({
    //   where: {
    //     requesterId: req.user.id,
    //   },
    //   include: [
    //     {
    //       model: Models.User,
    //       as: 'requesterUser',
    //       foreignKey: 'requesterId',
    //       attributes: {
    //         exclude: ['password', 'email'],
    //       },
    //     },
    //     {
    //       model: Models.User,
    //       as: 'requesteeUser',
    //       foreignKey: 'requesteeId',
    //       attributes: {
    //         exclude: ['password', 'email'],
    //       },
    //     },
    //   ],
    // })

    res.json([])
  } catch (error) {
    next(new HttpException(400, 'Invalid data'))
  }
})
