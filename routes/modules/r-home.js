// 這是 route 設定

const express = require('express')
const router = express.Router()
const s_record = require('../../models/s_record') // 載入 record 資料架構

// 顯示首頁
router.get('/', (req, res) => {
  s_record
    .find()
    .lean()
    .then(records => {
      // 加總
      const amountArray = records.map(records => records.amount)
      const amount = amountArray.reduce((a, b) => a + b, 0)
      ////////////////////// (上1) 不得不去了解 reduce 了

      const iconName = {
        家居物業: 'fa-house',
        交通出行: 'fa-van-shuttle',
        休閒娛樂: 'fa-face-grin-beam',
        餐飲食品: 'fa-utensils',
        其他: 'fa-pen',
      }

      return res.render('index', { records, amount, iconName: iconName[records.categoryName] })
    })
    .catch(err => console.error(err))
})

module.exports = router
