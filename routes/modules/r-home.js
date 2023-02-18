// 這是 route 設定

const express = require('express')
const router = express.Router()
const s_record = require('../../models/s_record') // 載入 record 資料架構

// 顯示首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  s_record
    .find({ userId })
    .lean()
    .then(records => {
      // 加總
      const amountArray = records.map(records => records.amount)
      const amount = amountArray.reduce((a, b) => a + b, 0)
      ////////////////////// (上1) 不得不去了解 reduce 了

      // 轉換日期寫法 (只為 rendering)
      records.forEach(record => (record.date = record.date.replace(/-/g, '/')))

      return res.render('index', { records, amount })
    })
    .catch(err => console.error(err))
})

module.exports = router
