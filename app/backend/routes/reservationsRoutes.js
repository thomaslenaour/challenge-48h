const express = require('express')

const reservationsController = require('../controllers/reservationsController')
const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

// /api/companies
router.get('/:reservationId', reservationsController.getReservation)
router.get('/company/:companyId', reservationsController.getReservationByCompagny)
router.post('/:companyId', reservationsController.createReservation)

router.use(checkAuth)

router.delete('/:reservationId', reservationsController.deleteReservation)

module.exports = router
