const router = require('express').Router()

//insert routes here
router.get('/', (req, res, next) => {
  res.send('ADMIN PLAYERS ROUTE')
})

module.exports = router
