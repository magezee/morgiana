import { Router }  from 'express'

import webHookRouter from './webhook'

const router = Router()

router.use(webHookRouter)

export default router