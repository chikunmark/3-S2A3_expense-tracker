const db = require('../../config/mongoose')
// const records = require() //////// 先用下面自製陣列替代，之後改
const s_record = require('../s_record')

const records = [
  { name: '午餐', amount: 60 },
  { name: '捷運', amount: 120 },
]

db.once('open', () => {
  Promise.all(
    records.map((record, record_index) => {
      return s_record.create({ ...record })
    })
  )
    .then(() => {
      console.log('資料建立完成')
      process.exit()
    })
    .catch(err => console.log(err))
})
