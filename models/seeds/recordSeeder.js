// 這個檔用來把預設 records 加入 DB

const db = require('../../config/mongoose')
const records = require('./records.json') // 從 .json 引入 record 資料
const bcrypt = require('bcryptjs')
const s_record = require('../s_record')
const s_category = require('../s_category')
const s_user = require('../s_user')

const SEED_USER = [
  {
    name: '123',
    email: '123@example.com',
    password: '123',
  },
]

// 把預設 records 加入 DB
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER[0].password, salt))
    .then(hash =>
      s_user.create({
        name: SEED_USER[0].name,
        email: SEED_USER[0].email,
        password: hash,
      })
    )
  // Promise.all(
  //   SEED_USER.map(user => {
  //     return s_user.create(user)
  //   })
  // )
  // Promise.all() 裡，陣列的元素必須要有值 (被 return)，否則 promise.all 不起作用)！！！
  Promise.all(
    records.map((record, record_index) => {
      return s_category
        .findOne({ name: record.categoryName })
        .then(category => {
          record.categoryId = category._id
          return s_user.findOne({ email: SEED_USER[0].email })
        })
        .then(user => {
          record.userId = user._id
          return s_record.create({ ...record }) ////////// 這裡的 ... 如果只是展開，就很奇怪，再查唄
        })
    })
  )
    .then(() => {
      console.log('record 資料建立完成，跳離程序')
      process.exit() // 跳離程序
    })
    .catch(err => console.log(err))
})
