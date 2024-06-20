import express from 'express'
import timeout from 'express-timeout-handler'
import cors from 'cors'
import bodyParser from 'body-parser'

import apiRoute from './api'

const app = express()

const timeoutOtions = {
  timeout: 5 * 60 * 1000,
  onTimeout: (req, res) => {
    res.status(503).send('超时噜~');
},
}

// 暂时全开 后期改掉
app.all('*', function(req, res, next){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers","X-Requestd-With")
  res.header("Access-Control-Allow-Headers","Content-Type")
  next()
})

app.use(timeout.handler(timeoutOtions))
app.use(cors())
app.use(bodyParser.json())
app.use('/api', apiRoute)

app.listen(3000, '0.0.0.0', () => {
  console.log('监听webhook服务启动成功!!')
})