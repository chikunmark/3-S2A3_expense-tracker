///////////////////// 我的擺法沒按教案順序，有問題先改這

// 載入 addon
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const helper = require('handlebars-helpers')() // 用了額外 add-on，之後想有無更簡單解法
const flash = require('connect-flash')
// 載入檔案
require('./config/mongoose')
const usePassport = require('./config/passport')
const routes = require('./routes/index') // 載入自訂的路由設定
// 設定變數
const PORT = process.env.PORT

//////////////// 先擺上來，mongoose 設定做完時殺掉試試 -> 上有 require mongoose，先註解掉試試
// 若不是生產環境，使用 dotenv (套件)
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
// 只知道是導入 public 資料夾，導入 JS, CSS 等，但裡面的 static 到底是啥意呢？

app.use(
  session({
    secret: process.env.SESSION_SECRET, // 這參數是 session 用來驗證 session id 的字串，由我們設定，可改成隨機的一個字串
    resave: false, // 若為 true，每次有新的 request，就會把 session 更新到 session store，然後蓋過去
    saveUninitialized: true, // 若為 true，強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
  })
)

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes) // 畢竟是路由表，得等上面所有程序都跑過 (前處理過) 再載入，才能確保正常
app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})
