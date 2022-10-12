import {Router} from 'express'
import usersRouter from './users.router.js'
import urlsRouter from './urls.router.js'
import authRouter from './auth.router.js'

const router = Router()
router.use(usersRouter)
router.use(urlsRouter)
router.use(authRouter)

export default router