import { Router } from 'express'
import { authRouter } from './auth'
import { errorHandler } from '../middleware/error'
import { furnitureRouter } from './furniture'
import { userRouter } from './user'
import { validationHandler } from '../middleware/jwt'

export const router = Router()

// open routes

router.use('/user', authRouter)

// protected routes

router.use(validationHandler)

router.use('/user', userRouter)
// router.use('/post', postRouter)
router.use('/furniture', furnitureRouter)
// router.use('/friendrequest', friendRequestRouter)
// router.use('/friend', friendRouter)
// router.use('/picture', pictureRouter)
// router.use('/comment', commentRouter)
// router.use('/chat', chatRouter)
// router.use('/message', messageRouter)

// error

router.use(errorHandler)
