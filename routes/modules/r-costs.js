// 這是 route 設定

const express = require('express')
const router = express.Router()
const s_record = require('../../models/s_record')

router.get('/add', (req, res) => {
  const title = '請輸入你的支出'
  const submitWord = '新增支出'
  res.render('addOrEdit', { title, submitWord })
})

router.get('/edit/:_id', (req, res) => {
  const title = '請修改你的支出'
  const submitWord = '送出修改'
  const id = req.params._id

  return s_record
    .findById(id)
    .lean()
    .then(record => res.render('addOrEdit', { record, title, submitWord }))
})

module.exports = router
