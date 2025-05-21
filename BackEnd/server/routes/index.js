const Router = require('express')
const router = new Router()
const developerRouter = require('./developerRouter')
const ratingRouter = require('./ratingRouter')
const gameRouter = require('./gameRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/user',userRouter)
router.use('/rating', ratingRouter)
router.use('/developer',developerRouter)
router.use('/game',gameRouter)
router.use('/type',typeRouter)
  
module.exports = router