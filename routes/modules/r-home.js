// 這是 route 設定

const express = require('express')
const router = express.Router()
const s_record = require('../../models/s_record') // 載入 record 資料架構

router.get('/', (req, res) => {
  s_record
    .find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.error(err))
})

module.exports = router
