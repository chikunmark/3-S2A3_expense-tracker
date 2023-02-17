const express = require('express')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000

//////////////// 先擺上來，mongoose 設定做完時殺掉試試
// 若不是生產環境，使用 dotenv (套件)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
// 只知道是導入 public 資料夾，導入 JS, CSS 等，但裡面的 static 到底是啥意呢？

// app.get('/', (req, res) => {
//   res.render('index')
// })

// app.get('/test', (req, res) => {
//   res.render('register')
// })

const routes = require('./routes/index')
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})
