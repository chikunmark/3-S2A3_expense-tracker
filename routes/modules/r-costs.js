// 這是 route 設定

const express = require('express')
const router = express.Router()

router.get('/add', (req, res) => {
  res.render('addOrEdit')
})

module.exports = router
