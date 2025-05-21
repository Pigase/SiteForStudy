const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, ratingController.setRating)
router.get('/check', authMiddleware, ratingController.checkUserRating)

module.exports = router