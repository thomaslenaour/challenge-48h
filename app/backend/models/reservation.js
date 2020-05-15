const mongoose = require('mongoose')

const { Schema } = mongoose

const reservationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  masks: { type: Number, required: true },
  created_at: { type: Number, required: true },
  company: { type: mongoose.Types.ObjectId, required: true, ref: 'Company' }
})

module.exports = mongoose.model('Reservation', reservationSchema)
