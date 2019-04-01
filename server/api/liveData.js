const router = require('express').Router()

//insert routes here
router.get('/:status', (req, res) => {
  const status = req.params.status
  if (status === 'on') {
    console.log('STATUS IS ON')
  }
  if (status === 'off') {
    console.log('STATUS IS OFF')
  }
  res.sendStatus(200)
})

module.exports = router
