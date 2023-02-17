const db = require('../../config/mongoose')
const categories = require('./categories.json') // 從 .json 引入 categories 資料
const s_category = require('../s_category')

db.once('open', () => {
  Promise.all(
    categories.map((category, category_index) => {
      ////////// 之後有時間再改進，加個判定，若已有該 category，就告知並跳過
      return s_category.create({ ...category })
    })
  )
    .then(() => {
      console.log('category 資料建立完成，跳離程序')
      process.exit()
    })
    .catch(err => console.log(err))
})
