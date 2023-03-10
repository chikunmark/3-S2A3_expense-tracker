// 這個檔是用來定義 record 資料架構

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ////////////////// 完成後再研究 date 格式
  date: {
    type: String,
    // type: Date,  // 雖然想用 date，但格式轉換太麻煩，先用 string
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true, // 把這個 key/value pair 設定成這個資料表的 index，增加搜尋效率
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId, ///////// 覺得可增加其他資料簡化它，做完再想
    ref: 'Category',
    required: true,
  },
  categoryName: {
    type: String,
    ref: 'Category',
    required: true,
  },
})

module.exports = mongoose.model('Record', recordSchema)
///////// 之後看 mongoose.model 是啥
////////// https://mongoosejs.com/docs/models.html#compiling
