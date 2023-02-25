// 這是 route 設定

const router = require('express').Router()
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
      // reduce 裡的 initialValue 還不能省呢，為了避免無法運算 (amountArray 是空的且沒 initialValue)

      // 轉換日期寫法 (只為 rendering)
      records.forEach(record => (record.date = record.date.replace(/-/g, '/')))

      return res.render('index', { records, amount })
    })
    .catch(err => console.error(err))
})

module.exports = router
