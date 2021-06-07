const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4000
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandlers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.use(errorHandler)

app.listen(PORT, _ => console.log(`Orchestrator running at http://localhost:${PORT}`))