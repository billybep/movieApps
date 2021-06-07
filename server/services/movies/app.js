const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4001

const { connect } = require('./config/mongodb')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandlers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandler)

connect()
  .then( _ => {
    console.log('connection to database success') 
    app.listen(PORT, _ => console.log(`Movies-Server listen at http://localhost:${PORT}`))
  })
