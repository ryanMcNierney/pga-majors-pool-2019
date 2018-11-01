const router = require('express').Router()

// router.use('INSERT FILE NAME', require('./FILE PATH')) // matches requests to /api/file name

//404 handling
router.use(function (req, res, next) {
  const err = new Error('Not found.')
  err.status = 404
  next(err)
})


module.exports = router
