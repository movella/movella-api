import { Model, col, fn, literal } from 'sequelize'

import { HttpException } from '../../exceptions/httpexception'
import { Models } from '../../services/sequelize'
import { Router } from 'express'
import { SequelizeModels } from '../../typescript'

export const furnitureRouter = Router()

furnitureRouter.post('/all', async (req, res, next) => {
  try {
    const posts = await Models.Furniture.findAll({
      group: 'id',
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Models.User,
          attributes: {
            exclude: ['password', 'email'],
          },
        },
      ],
    })

    res.json(posts)
  } catch (error) {
    next(new HttpException(400, 'Invalid data'))
  }
})

furnitureRouter.post('/create', async (req, res, next) => {
  const content = req.body.content

  try {
    // matches(content, 'string', 'Invalid content', {
    //   minLength: 1,
    //   maxLength: 200,
    // })
  } catch (error) {
    return void next(new HttpException(400, error))
  }

  try {
    // await Models.Furniture.create<Model<SequelizeModels.Post, {}>>({
    //   content: content,
    //   userId: req.user.id,
    // })
    // res.json({
    //   message: 'Furniture created',
    // })
  } catch (error) {
    next(new HttpException(400, 'Invalid data'))
  }
})

// furnitureRouter.post('/like', async (req, res, next) => {
//   const id = req.body.id

//   try {
//     await Models.Like.create<Model<SequelizeModels.Like, {}>>({
//       userId: req.user.id,
//       postId: id,
//     })

//     res.json({
//       message: 'Post liked',
//     })
//   } catch (error) {
//     next(new HttpException(400, 'Invalid data'))
//   }
// })

// furnitureRouter.post('/unlike', async (req, res, next) => {
//   const id = req.body.id

//   try {
//     await Models.Like.destroy({
//       where: {
//         userId: req.user.id,
//         postId: id,
//       },
//     })

//     res.json({
//       message: 'Like removed',
//     })
//   } catch (error) {
//     next(new HttpException(400, 'Invalid data'))
//   }
// })
