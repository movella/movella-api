import * as yup from 'yup'

import { HttpException } from '../../exceptions/httpexception'
import { Models } from '../../services/sequelize'
import { Op } from 'sequelize'
import { Router } from 'express'
import { sha256 } from '../../utils/crypto'
import { sign } from '../../middleware/jwt'

export const authRouter = Router()

authRouter.post('/login', async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string(),
  })

  try {
    if (!(await schema.isValid({ email, password }))) {
      throw 'Invalid data'
    }

    const user = await Models.User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        [Op.and]: {
          email: email,
          password: sha256(password),
        },
      },
    })

    if (user) {
      res.setHeader('authorization', sign(user.get()))

      res.json(user)
    } else {
      next(new HttpException(400, 'User not found'))
    }
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid login data'))
  }
})

authRouter.post('/register', async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const username = req.body.username

  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string(),
    username: yup.string(),
  })

  try {
    if (!(await schema.isValid({ email, password, username }))) {
      throw 'Invalid data'
    }

    const user = await Models.User.create({
      access: 'default',
      email: email,
      password: sha256(password),
      picture: 'user-default',
      username: username,
    })

    res.setHeader('authorization', sign(user.get()))

    res.json(user)
  } catch (error) {
    console.log(error)
    next(new HttpException(400, 'Invalid data'))
  }
})
