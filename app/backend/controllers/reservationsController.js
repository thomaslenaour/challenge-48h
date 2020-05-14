const Reservation = require('../models/reservation')
const Compagny = require('../models/company')
const HttpError = require('../models/http-error')

const mongoose = require('mongoose')

const MAIL_CHECK = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const PHONE_CHECK = new RegExp(/^\(?([0-9]{2})\)?[.]?([0-9]{2})[.]?([0-9]{2})[.]?([0-9]{2})[.]?([0-9]{2})$/)

module.exports = {
    getReservation : async function (req, res, next) {

        let reservationId = req.params.reservationId

        let reservationFound
        try {
            reservationFound = await Reservation.findById(reservationId)
        } catch (error) {
            return next(
                new HttpError('Something went wrong, could not search reservation.', 500)
            )
        }
        
        if (!reservationFound) {
            return next(
                new HttpError('No reservation with this id was found.', 404)
            )
        }
        
        res.json({ reservationFound })
    },

    getReservationByCompagny : async function (req, res, next) {
        
        let companyId = req.params.companyId

        let reservations

        try {
            reservations = await Reservation.find({ company : companyId })
        } catch (error) {
            return next(
                new HttpError('Unable to fetch reservations.', 500)
            )
        }

        if (!reservations) {
            return next(
                new HttpError('No reservations were found.', 404)
            )
        }

        res.json({ reservations: reservations.map(reservation => reservation.toObject({ getters: true })) })

    },

    createReservation : async function (req, res, next) {

        // get params
        let name = req.body.name
        let email = req.body.email
        let phone = req.body.phone
        let masks = req.body.masks
        let companyId = req.params.companyId

        // verif params
        // verif name
        if ( name.length < 6 || name.length > 32 ) {
            return next(
                new HttpError('NAME Invalid inputs passed, please check your data', 422)
            )
        }

        // verif mail
        if ( !MAIL_CHECK.test(email) ) {
            return next(
                new HttpError('MAIL Invalid inputs passed, please check your data', 422)
            )
        }

        // verif phone
        if ( !PHONE_CHECK.test(phone) ) {
            return next(
                new HttpError('PHONE Invalid inputs passed, please check your data', 422)
            )
        }

        // verif masks
        if ( isNaN(masks) ) {
            return next(
                new HttpError('MASKS Invalid inputs passed, please check your data', 422)
            )
        }
        
        // verif company exists
        let companyFound
        
        try {
            companyFound = await Compagny.findById(companyId)
        } catch (error) {
            return next(
                new HttpError('Unable to find compagny', 500)
            )
        }

        if (!companyFound) {
            return next(
                new HttpError('The compagny seems not exists', 404)
            )
        }

        if ( masks > companyFound.masks_stock ) {
            return next(
                new HttpError('The compagny cannot offer you that amount of masks', 404)
            )
        }

        // create reservation
        let newCommand = new Reservation({
            name,
            email,
            phone,
            masks,
            company : companyId
        })

        try {
            const sess = await mongoose.startSession()
        
            sess.startTransaction()
            await newCommand.save({ session: sess })
            companyFound.reservations.push(newCommand)
            await companyFound.save({ session: sess })
            await sess.commitTransaction()
        } catch (err) {
            return next(
                new HttpError('Reservation creation failed, please retry later', 404)
            )
        }

        companyFound.masks_stock -= 1
        companyFound.save()

        res.status(201).json({ newCommand })

    },

    deleteReservation : function (req, res, next) {
        
    },
}