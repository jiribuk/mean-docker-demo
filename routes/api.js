// api.js
console.log('api starting')

const express = require('express')
const router = express.Router()

/* GET api listing. */
router.get('/', (req, res) => {
  const NODE_ENV = process.env.NODE_ENV
  res.send('Express API works. NODE_ENV=' + NODE_ENV)
})

module.exports = router
