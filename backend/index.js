const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ProductsRoutes = require('./Routes/ProductRouter')

require('dotenv').config()
require('./Models/db')

const PORT = process.env.PORT || 4000

server.get('/', (req, res) => {
  res.send('server connnected!!!')
})
app.get('/ping', (req, res) => {
  res.send('PONG')
})

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', AuthRouter)
app.use('/products', ProductsRoutes)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
