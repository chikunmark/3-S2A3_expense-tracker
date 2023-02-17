// 這是 route 設定

const router = require('express').Router()
////////////////////// 簡化了，先測試一個就好，成功再改到其他地方，以前如下2
// const express = require('express')
// const router = express.Router()

// 載入路由細節
const auth = require('./modules/r-auth')
const costs = require('./modules/r-costs')
const users = require('./modules/r-users')
const filter = require('./modules/r-home.sortAndFilter')
const home = require('./modules/r-home')

// 使用路由檔、設定路由條件
router.use('/auth', auth)
router.use('/costs', costs)
router.use('/users', users)
router.use('/filter', filter)
router.use('/', home)

module.exports = router
