// 這是 route 設定

const express = require('express')
const passport = require('passport')
const router = express.Router()

// 觸發 FB 登入程序
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  })
)

// FB 把登入驗證結果回傳的目的地
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    // 若寫成 'users/login' 或 './users/login'，最後都會 redirect 到 ...:3000/users/users/login
  })
)

module.exports = router
