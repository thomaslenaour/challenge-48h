const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Company = require('../models/company')
const HttpError = require('../models/http-error')

const getCompanies = async (req, res, next) => {}

const getCompany = async (req, res, next) => {}

const updateCompany = async (req, res, next) => {}

const deleteCompany = async (req, res, next) => {}

const register = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const {
    name,
    email,
    password,
    address,
    postalCode,
    city,
    masksStock
  } = req.body

  let existingCompany
  try {
    existingCompany = await Company.findOne({ email })
  } catch (error) {
    return next(new HttpError("Impossible de s'inscrire pour le moment", 500))
  }

  if (existingCompany) {
    return next(
      new HttpError('Un compte existe déjà avec cette adresse email', 422)
    )
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    return next(
      new HttpError('Impossible de créer un compte pour le moment', 500)
    )
  }

  const createdCompany = new Company({
    name,
    email,
    password: hashedPassword,
    address,
    postal_code: postalCode,
    city,
    masks_stock: masksStock,
    created_at: new Date().getTime(),
    reservations: []
  })

  try {
    await createdCompany.save()
  } catch (error) {
    return next(new HttpError("L'inscription a échouée", 500))
  }

  let token
  try {
    token = jwt.sign(
      { userId: createdCompany.id, email: createdCompany.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later', 500))
  }

  res
    .status(201)
    .json({ companyId: createdCompany.id, email: createdCompany.email, token })
}

const login = async (req, nes, next) => {
  const { email, password } = req.body

  let user
  try {
    user = await User.findOne({ email })
  } catch (error) {
    return next(new HttpError('Logging in failed.', 500))
  }

  if (!user) {
    return next(new HttpError('Invalid credentials', 403))
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, user.password)
  } catch (err) {
    return next(
      new HttpError(
        'Could not login, please check your credentials and try again.',
        500
      )
    )
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials', 403))
  }

  let token
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Logging up failed, please try again', 500))
  }

  res.json({ userId: user.id, email: user.email, token })
}

exports.getCompanies = getCompanies
exports.getCompany = getCompany
exports.updateCompany = updateCompany
exports.deleteCompany = deleteCompany
exports.register = register
exports.login = login
