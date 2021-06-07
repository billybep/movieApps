const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const { connect } = require('./config/mongodb')
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

connect()
  .then( _ => {
    console.log('connection to database success') 
    app.listen(PORT, _ => console.log(`app listen at http://localhost:${PORT}`))
  })

