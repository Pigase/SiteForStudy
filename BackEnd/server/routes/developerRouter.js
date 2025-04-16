const Router = require('express')
const router = new Router()
const developerController = require('../controllers/developerController')

router.post('/',developerController.create)
router.get('/',developerController.getAll)

module.exports = router