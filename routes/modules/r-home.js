// 這是 route 設定

const express = require('express')
const router = express.Router()
const s_record = require('../../models/s_record') // 載入 record 資料架構

router.get('/', (req, res) => {
  s_record
    .find()
    .lean()
    .then(records => {
      const amountArray = records.map(records => records.amount)
      const amount = amountArray.reduce((a, b) => a + b, 0)
      ////////////////////// (上1) 不得不去了解 reduce 了
      return res.render('index', { records, amount })
    })
    .catch(err => console.error(err))
})

module.exports = router
