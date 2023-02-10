const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const path = require('path')

const Routes = require('./routes/route')
const Connection = require('./config/database')

dotenv.config({ path: './config.env' })
const app = express()
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

Connection(username, password)

const PORT = 8080
app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
)

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/', Routes)
