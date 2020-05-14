const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose

const companySchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  postal_code: { type: String, required: true },
  city: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  masks_stock: { type: Number, required: true },
  created_at: { type: Number, required: true },
  updated_at: { type: Number },
  reservations: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Reservation' }
  ]
})

companySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Company', companySchema)
