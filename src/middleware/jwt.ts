import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'

import { HttpException } from '../exceptions/httpexception'
import { RequestHandler } from 'express'
import { SequelizeModels } from '../typescript'

dotenv.config()

export const validationHandler: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (token === undefined) throw new Error()

    const decoded = (jwt.verify(
      token,
      process.env.SECRET
    ) as unknown) as SequelizeModels.UserAttributes
    req.user = decoded
    next()
  } catch (error) {
    next(new HttpException(401, 'Invalid access token'))
  }
}

export const sign = (user: SequelizeModels.UserAttributes) => {
  return jwt.sign(user, process.env.SECRET)
}
