const inspect = require('util')

// api.js
console.log('api starting')

const express = require('express')
const router = express.Router()

const ArticleModel = require('../models/article')

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Express API works. ENV=' + JSON.stringify(process.env))
})

router.post('/article', (req, res) => {
  // Compile model from schema
  const article = { text: randomString(20), datePublished: new Date() }
  ArticleModel.create(article, (err, instance) => {
    if (err) {
      console.error(err)
      res.send(err).status(500)
    } else {
      console.log(instance)
      res.send(instance).status(201)
    }
  })
})

router.get('/article', (req, res) => {
  // Compile model from schema
  const article = { text: randomString(20), datePublished: new Date() }
  ArticleModel.find({}, (err, articles) => {
    if (err) {
      console.error(err)
      res.send(err).status(500)
    } else {
      console.log(instance)
      res.send(articles).status(201)
    }
  })
})

const randomString = length => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

module.exports = router
