const express = require('express')
const cors = require('cors')
const app = express()

const connection = require('../src/config')
const routes = require('../routes/index')
const port = 4242

app.use(cors('*'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use('/images', routes.image, function (req, res, next) {
  next()
})

app.use('/memes', routes.memes, function (req, res, next) {
  next()
})

app.listen(port, () => {
  console.log(`Server is runing on ${port}`)
})
