const jwt = require('jsonwebtoken')
const HttpError = require('../models/http-error')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      throw new Error("L'authentication a échouée")
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    req.companyData = { companyId: decodedToken.companyId }
    next()
  } catch (err) {
    return next(new HttpError("L'authentication a échouée", 403))
  }
}
