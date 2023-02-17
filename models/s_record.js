// 這個檔是用來定義 record 資料架構

// const { Date } = require('mongoose/lib')
//////// (上1) 這個在我使用 type: Date 時就跑出來，不知為何，先註解掉，有錯再開

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
    // type: Date,  // 雖然享用 date，但格式轉換太麻煩，先用 string
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // ////////////////// 還沒做使用者 (登入) 機制，做了再啟用
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   index: true, // 把這個 key/value pair 設定成這個資料表的 index，增加搜尋效率
  //   required: true,
  // },
  // 等初次測試 OK 再解 comment
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
