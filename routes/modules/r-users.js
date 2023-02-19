// 這是 route 設定

const router = require('express').Router()

// /////////////// (下1) r-auth.js 也有用到，全部完成後可試，看能不能簡化
const passport = require('passport')
const bcrypt = require('bcryptjs')
const s_user = require('../../models/s_user')

// 顯示登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 送出登入資料
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureMessage: true,
    failureRedirect: '/users/login',
  })
)

// 顯示註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 送出註冊資料
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不同。' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  s_user.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '此 email 已被註冊' })
      return res.render('register', { errors, name, email, password, confirmPassword })
    }

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => s_user.create({ name, email, password: hash }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出')
  res.redirect('/users/login')
})

module.exports = router
