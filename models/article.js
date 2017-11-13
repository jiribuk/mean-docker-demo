const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  text: String,
  datePublished: Date
})

const Model = mongoose.model('article', Schema)

module.exports = Model
