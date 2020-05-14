const express = require('express')

const companiesController = require('../controllers/companiesController')

const router = express.Router()

// /api/customers
router.get('/user/:userId', companiesController.getCustomers)
router.get('/:customerId', companiesController.getCustomer)
router.patch('/:customerId', companiesController.updateCustomer)
router.delete('/:customerId', companiesController.deleteCustomer)
router.post('/', companiesController.createCustomer)

module.exports = router
