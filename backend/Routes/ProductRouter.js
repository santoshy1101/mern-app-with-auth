const ensuredAuthenticated = require('../Middlewares/Auth')

const router = require('express').Router()

router.get('/', ensuredAuthenticated, (req, res) => {
console.log('--- logged in user details ---', req.user)
  res.status(200).json([
    {
      name: 'mobile',
      price: '10000',
    },
    {
      name: 'tv',
      price: '2000',
    },
  ])
})

module.exports = router
