const router = require('express').Router()

//insert routes here
router.get('/:status', (req, res, next) => {
  const status = req.params.status
  if (status === 'on') {
    console.log('LIVE DATA IS ON')
  }
  if (status === 'off') {
    console.log('STATUS IS OFF')
  }
  res.send(200)
})

module.exports = router
