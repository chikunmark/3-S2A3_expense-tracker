// 這是 route 設定

const express = require('express')
const router = express.Router()
const s_record = require('../../models/s_record')
const s_category = require('../../models/s_category')
// const helper = require('handlebars-helpers')()

// 顯示新增頁面
router.get('/add', (req, res) => {
  const pageInfo = { title: '請輸入你的支出', submitWord: '新增支出', id: '' }
  res.render('addOrEdit', { pageInfo })
})

// 送出新增頁面
router.post('/add', (req, res) => {
  s_category
    .findOne({ name: req.body.categoryName })
    .then(category => {
      // console.log(category)
      req.body.categoryId = category._id
      // console.log(req.body)
      return s_record.create(req.body).then(res.redirect('/')) // 擺這 OK
    })
    // .then(res.redirect('/')) // 擺這會有 "非同步問題"，再想原因
    .catch(err => console.warn(err))

  // return s_record
  //   .create(req.body)
  //   .then(res.redirect('/'))
  //   .catch(err => console.warn(err)) ///////// 之後查 console.warn() 跟 .log()、.error() 差異
})

// 顯示修改頁面
router.get('/edit/:_id', (req, res) => {
  const id = req.params._id
  const pageInfo = { title: '請修改你的支出', submitWord: '送出修改', id: `${id}` }

  return s_record
    .findById(id)
    .lean()
    .then(record => res.render('addOrEdit', { record, pageInfo }))
})

// 送出修改頁面
router.post('/:_id', (req, res) => {
  const _id = req.params._id
  const updateObj = req.body
  return s_record
    .findByIdAndUpdate(_id, updateObj)
    .then(res.redirect('/'))
    .catch(err => console.warn(err))
})

module.exports = router
