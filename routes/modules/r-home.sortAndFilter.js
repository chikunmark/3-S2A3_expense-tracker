// 這是 route 設定

const express = require('express')
const s_record = require('../../models/s_record')
const router = express.Router()

router.get('/', (req, res) => {
  let filter = req.query.filter

  // 先把所有 records 找出，再篩選
  return s_record
    .find()
    .lean()
    .then(records => {
      // 若 record 的 categoryName 與 filter 條件吻合，就篩出來 (若篩選值是 '' 或 undefine，全都 true)
      const filterRecords = records.filter(record => record.categoryName.includes(filter))

      // 加總，有多處用到，可能可包裝成 Fn.
      const amountArray = filterRecords.map(records => records.amount)
      const amount = amountArray.reduce((a, b) => a + b, 0)
      ////////////////////// (上1) 不得不去了解 reduce 了

      return res.render('index', { records: filterRecords, amount, filter })
    })
})

module.exports = router
