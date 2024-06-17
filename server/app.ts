import express from 'express'
import history from 'connect-history-api-fallback'
import path from 'path'

const app = express()

// 暂时全开 后期改掉
app.all('*',function(req,res,next){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers","X-Requestd-With")
  res.header("Access-Control-Allow-Headers","Content-Type")
  next()
})

app.use(history({
  index: 'index.html'
}))
app.use(express.static(path.join(__dirname, '../dist')))

app.listen(80, '0.0.0.0', () => {
  console.log('服务启动成功!!')
  console.log('http://localhost')
})