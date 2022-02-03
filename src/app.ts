require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'

import userRouter from './routers/userRouter'
import productRouter from './routers/productRouter'
import testRouter from './routers/testRouter'
import addressRouter from './routers/addressRouter'
import favoriteRouter from './routers/favoriteRouter'
import historySearchRouter from './routers/historySearchRouter'

const app = express()

app.use(bodyParser.json({limit: '2mb'}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.get('/', (req, res) => {
  return res.redirect('https://documenter.getpostman.com/view/15242317/UVXetJnL')
})
app.use('/', userRouter)
app.use('/', productRouter)
app.use('/', testRouter)
app.use('/', addressRouter)
app.use('/', favoriteRouter)
app.use('/', historySearchRouter)
app.all('*', (req, res) => {
  return res.status(404).json({
    message: 'API not found'
  })
})

app.listen(process.env.HOST || 5000, () => {
  console.log('---=== Server started ===---')
})
