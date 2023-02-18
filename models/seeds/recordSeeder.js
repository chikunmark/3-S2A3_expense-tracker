// 這個檔用來把預設 records 加入 DB

const db = require('../../config/mongoose')
const records = require('./records.json') // 從 .json 引入 record 資料
const s_record = require('../s_record')
const s_category = require('../s_category')

// 把預設 records 加入 DB
db.once('open', () => {
  Promise.all(
    records.map(record => {
      s_category.findOne({ name: record.categoryName }).then(category => {
        record.categoryId = category._id
        return s_record.create({ ...record }) ////////// 這裡的 ... 如果只是展開，就很奇怪，再查唄
      })
    })
  )
    .then(() => {
      console.log('record 資料建立完成，跳離程序')
      //////////////// 不知為何 Promise.all 沒用，加完資料前就關閉，之後想
      // process.exit() // 跳離程序
    })
    .catch(err => console.log(err))
})
