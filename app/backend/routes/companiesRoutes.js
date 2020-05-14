const express = require('express')
const { check, body } = require('express-validator')

const companiesController = require('../controllers/companiesController')

const router = express.Router()

// /api/companies
router.get('/', companiesController.getCompanies)
router.get('/:companyId', companiesController.getCompany)
router.patch('/:companyId', companiesController.updateCompany)
router.delete('/:companyId', companiesController.deleteCompany)
router.post(
  '/register',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').not().isEmpty(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Les mots de passes ne correspondent pas')
      }

      return true
    }),
    check('address').not().isEmpty(),
    check('postalCode').not().isEmpty(),
    check('city').not().isEmpty(),
    check('masksStock').not().isEmpty()
  ],
  companiesController.register
)
router.post('/login', companiesController.login)

module.exports = router
