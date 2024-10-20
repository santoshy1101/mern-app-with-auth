const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const ProductsRoutes = require('./Routes/ProductRouter')

require('dotenv').config()

app.use(bodyParser.json())
app.use(
  cors({
    origin: '',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  }),
)

require('./Models/db')

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('server connnected!!!')
})
app.get('/ping', (req, res) => {
  res.send('PONG')
})

app.use('/auth', AuthRouter)
app.use('/products', ProductsRoutes)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
