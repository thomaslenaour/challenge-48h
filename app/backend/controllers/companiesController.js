const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getCoordsForAddress = require('../util/location')
const Company = require('../models/company')
const Reservation = require('../models/reservation')
const HttpError = require('../models/http-error')

const getCompanies = async (req, res, next) => {
  let companies
  try {
    companies = await Company.find({}, '-password -reservations')
  } catch (error) {
    return next(
      new HttpError('La requête pour récupérer les comptes a échoué', 500)
    )
  }

  res.json({
    companies: companies.map(company => company.toObject({ getters: true }))
  })
}

const getCompany = async (req, res, next) => {
  const { companyId } = req.params

  let company
  try {
    company = await Company.findById(companyId, '-password -reservations')
  } catch (err) {
    return next(
      new HttpError(
        'Impossible de récupérer les informations associé à cet identifiant',
        500
      )
    )
  }

  if (!company) {
    return next(
      new HttpError(
        'Impossible de récupérer les informations associé à cet identifiant',
        404
      )
    )
  }

  res.json({ company: company.toObject({ getters: true }) })
}

const updateCompany = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const { name, email, address, postalCode, city, masksStock } = req.body
  const { companyId } = req.params

  let company
  try {
    company = await Company.findById(companyId, '-password -reservations')
  } catch (error) {
    return next(
      new HttpError(
        'Impossible de modifier vos informations pour le moment',
        500
      )
    )
  }

  if (company.id !== req.companyData.companyId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action", 401)
    )
  }

  let coordinates
  try {
    coordinates = await getCoordsForAddress(`${address} ${postalCode} ${city}`)
  } catch (error) {
    return next(error)
  }

  company.name = name
  company.email = email
  company.address = address
  company.postal_code = postalCode
  company.city = city
  company.location = coordinates
  company.masks_stock = masksStock
  company.updated_at = new Date().getTime()

  console.log(company)

  try {
    await company.save()
  } catch (error) {
    return next(
      new HttpError('Impossible de modifier votre compte pour le moment', 500)
    )
  }

  res.status(200).json({ company: company.toObject({ getters: true }) })
}

const deleteCompany = async (req, res, next) => {
  const { companyId } = req.params

  let company
  try {
    company = await Company.findById(companyId)
  } catch (error) {
    return next(new HttpError('Impossible de supprimer cet utilisateur', 500))
  }

  if (!company) {
    return next(
      new HttpError(
        "Impossible de supprimer l'utilisateur associé à cet ID",
        404
      )
    )
  }

  if (company.id !== req.companyData.companyId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cet action", 401)
    )
  }

  try {
    await Reservation.deleteMany({ company: companyId })
    await company.remove()
  } catch (err) {
    return next(new HttpError('Impossible de supprimer cet utilisateur', 500))
  }

  res.status(200).json({ message: 'Utilisateur supprimé' })
}

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

  if (masksStock < 0) {
    return next(
      new HttpError('Le nombre de masque ne peut pas être négatif', 422)
    )
  }

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

  let coordinates
  try {
    coordinates = await getCoordsForAddress(`${address} ${postalCode} ${city}`)
  } catch (error) {
    return next(error)
  }

  const createdCompany = new Company({
    name,
    email,
    password: hashedPassword,
    address,
    postal_code: postalCode,
    city,
    location: coordinates,
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

const login = async (req, res, next) => {
  const { email, password } = req.body

  let company
  try {
    company = await Company.findOne({ email })
  } catch (error) {
    return next(new HttpError('Impossible de se connecter', 500))
  }

  if (!company) {
    return next(
      new HttpError('Impossible de trouver un compte associé à cet email', 403)
    )
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, company.password)
  } catch (err) {
    return next(
      new HttpError(
        'Impossible de se connecter, vérifiez vos identifiants et réessayez',
        500
      )
    )
  }

  if (!isValidPassword) {
    return next(new HttpError('Le mot de passe est invalide', 403))
  }

  let token
  try {
    token = jwt.sign(
      { companyId: company.id, email: company.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Logging up failed, please try again', 500))
  }

  res.json({ companyId: company.id, email: company.email, token })
}

exports.getCompanies = getCompanies
exports.getCompany = getCompany
exports.updateCompany = updateCompany
exports.deleteCompany = deleteCompany
exports.register = register
exports.login = login
