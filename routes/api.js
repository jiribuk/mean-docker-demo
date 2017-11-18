const inspect = require('util')

// api.js
console.log('api starting')

const express = require('express')
const router = express.Router()

const ArticleModel = require('../models/article')

/* GET api listing. */
router.get('/', (req, res) => {
  const dns = require('dns')

  dns.lookup('cos-service-nodeport-service', (err, address, family) => {
    if (err) {
      res.send(err).status(500)
    } else {
      res.send('API works.<h1>DNS</h1>' + JSON.stringify(address) + '</br>' + JSON.stringify(family) + '<h1>ENV</h1>' + JSON.stringify(process.env))
    }
  })
})

router.post('/article', (req, res) => {
  // Compile model from schema
  const article = { text: randomString(20), datePublished: new Date() }
  ArticleModel.create(article, (err, instance) => {
    if (err) {
      console.error(err)
      res.status(500).json(err)
    } else {
      console.log(instance)
      res.status(201).json(instance)
    }
  })
})

router.get('/article', (req, res) => {
  ArticleModel.find({}, (err, articles) => {
    if (err) {
      console.error(err)
      res.status(500).json(err)
    } else {
      console.log(articles.length)
      res.status(200).json(articles)
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
