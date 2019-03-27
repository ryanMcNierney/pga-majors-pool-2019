const router = require('express').Router()

//insert routes here
router.get('/', (req, res, next) => {
  res.send('PLAYERS ROUTE')
})

module.exports = router
