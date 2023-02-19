// 這是 route 設定

const router = require('express').Router()
////////////////////// 簡化了，先測試一個就好，成功再改到其他地方 -> 目前沒問題，改!

// 載入路由細節
const auth = require('./modules/r-auth')
const costs = require('./modules/r-costs')
const users = require('./modules/r-users')
const filter = require('./modules/r-home.sortAndFilter')
const home = require('./modules/r-home')

// 載入自訂的認證設定
const { authenticator } = require('../middleware/auth')

// 使用路由檔、設定路由條件
router.use('/auth', auth)
router.use('/users', users)
router.use('/costs', authenticator, costs)
router.use('/filter', authenticator, filter)
router.use('/', authenticator, home)

module.exports = router
