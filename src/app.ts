require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'

import userRouter from './routers/userRouter'
import productRouter from './routers/productRouter'

const app = express()

app.use(bodyParser.json({limit: '2mb'}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome'
  })
})
app.use('/', userRouter)
app.use('/', productRouter)

app.listen(process.env.HOST || 5000, () => {
  console.log('---=== Server started ===---')
})
