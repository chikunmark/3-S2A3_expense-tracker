// 這個檔是用來定義 record 資料架構

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  num: {
    type: Number,
    // required: true,
  },
})

module.exports = mongoose.model('Category', categorySchema)
