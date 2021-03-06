require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import userRouter from './routers/userRouter'
import productRouter from './routers/productRouter'
import testRouter from './routers/testRouter'
import addressRouter from './routers/addressRouter'
import favoriteRouter from './routers/favoriteRouter'
import historySearchRouter from './routers/historySearchRouter'
import categoryRouter from './routers/categoryRouter'
import orderRouter from './routers/orderRouter'
import adminRouter from './routers/adminRouter'

const app = express()

app.use(cors())

app.use(bodyParser.json({limit: '2mb'}))
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', '*')
//   res.setHeader('Access-Control-Allow-Headers', '*')
//   next()
// })

app.get('/', (req, res) => {
  return res.redirect('https://documenter.getpostman.com/view/15242317/UVXetJnL')
})
app.use('/', userRouter)
app.use('/', productRouter)
app.use('/', testRouter)
app.use('/', addressRouter)
app.use('/', favoriteRouter)
app.use('/', historySearchRouter)
app.use('/', categoryRouter)
app.use('/', orderRouter)
app.use('/', adminRouter)
app.all('*', (req, res) => {
  return res.status(404).json({
    message: 'API not found'
  })
})
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('---=== Server started ===---')
})
