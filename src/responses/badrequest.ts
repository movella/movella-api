import { Response } from 'express'

export const badRequestResponse = (res: Response) => {
  return res.status(400).json({ message: 'Bad request' })
}
