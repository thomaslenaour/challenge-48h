const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const companiesRoutes = require('./routes/companiesRoutes')
const reservationsRoutes = require('./routes/reservationsRoutes')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next()
})

app.use('/api/companies', companiesRoutes)
app.use('/api/reservations', reservationsRoutes)

// Error handling
app.use((req, res, next) => {
  throw new HttpError('Impossible de trouver cette route', 404)
})

// Error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'Une erreur inconnue est survenue' })
})

mongoose.set('useCreateIndex', true)
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-tdkyv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => app.listen(process.env.PORT || 5000))
  .catch(error => console.log(error))
