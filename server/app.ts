import express from 'express'
import cors from 'cors'
import path from 'path'

import apiRoute from './api'

const app = express()

// 暂时全开 后期改掉
app.all('*', function(req, res, next){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers","X-Requestd-With")
  res.header("Access-Control-Allow-Headers","Content-Type")
  next()
})

app.use(express.static(path.join(__dirname, '../dist')))
app.use(cors())
app.use('/api', apiRoute)

// 单页面应用需要兜住路由，确保访问无效路由时能重新指定向回html来达到跳转到页面路由的目的、
// 需要放在所有路由声明之后~
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(80, '0.0.0.0', () => {
  console.log('服务启动成功!!')
  console.log('http://localhost')
})