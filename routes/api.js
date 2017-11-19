const inspect = require('util')

// api.js
console.log('api starting')

const express = require('express')
const router = express.Router()

const ArticleModel = require('../models/article')

/* GET api listing. */
router.get('/', (req, res) => {
  const dns = require('dns')

  let start = Date.now()
  dns.lookup('cos-service-nodeport-service', (err, address, family) => {
    if (err) {
      res.send(err).status(500)
    } else {
      let dnsTime = Date.now() - start
      let envVarText = JSON.stringify(process.env)
      envVarText = envVarText.replace(/\"/g, '')
      let envVars = envVarText.split(',')
      envVars.sort()
      envVarText = envVars.join('<br/>')
      res.send('API works.<h1>DNS</h1>' + JSON.stringify(address) + ' ' + dnsTime + 'ms' + '</br>' + JSON.stringify(family) + '<h1>ENV</h1>' + envVarText)
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
