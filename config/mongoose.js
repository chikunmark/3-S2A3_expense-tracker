// 這個檔用來連 mongoDB

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // 設定連線到 mongoDB
const db = mongoose.connection

// db.on('error', () => {
//   console.log('mongodb error!!')
// })
// db.once('open', () => {
//   // 因只會發生一次，所以用 once
//   console.log('mongoDB connected!!')
// })

//////////////////////////////// 改了 (上面是原版)，有問題就把上面拿來用
// 覺得可能會有問題，畢竟改成這樣，代表有 return，可能會造成函式結束
db.on('error', () => console.log('mongodb error!!'))
db.once('open', () => console.log('mongoDB connected!!'))
// (上1) 因只會發生一次，所以用 once

module.exports = db
