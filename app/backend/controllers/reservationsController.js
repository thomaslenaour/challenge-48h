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
            reservationFound = await Reservation.findById(reservationId).populate('company')
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

        if (reservationFound.company.id !== req.companyData.companyId) {
            return next(
                new HttpError('You are not allowed to access this record.', 401)
            )
        }
        
        res.json({ reservationFound })
    },

    getReservationByCompagny : async function (req, res, next) {
        
        let companyId = req.params.companyId

        let reservations

        try {
            reservations = await Reservation.find({ company : companyId }).populate('company')
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

        if (reservations[0].company.id !== req.companyData.companyId) {
            return next(
                new HttpError('You are not allowed to access these records.', 401)
            )
        }

        res.status(201).json({ reservations: reservations.map(reservation => reservation.toObject({ getters: true })) })

    },

    createReservation : async function (req, res, next) {

        // get params
        let { name, email, phone, masks } = req.body
        let companyId = req.params.companyId

        // verif params
        if ( name.length < 6 ||             // check if name is not too short
            name.length > 32 ||             // check if name is not too long
            !MAIL_CHECK.test(email) ||      // check if mail is valid
            !PHONE_CHECK.test(phone) ||     // check if phone is valid
            isNaN(masks) ||                 // check if masks is a number
            masks < 1 ) {                  // check if commands contains at least 0 masks
            return next(
                new HttpError('Invalid inputs passed, please check your data', 422)
            )
        }
        
        // verif company exists
        let companyFound
        
        try {
            companyFound = await Compagny.findById(companyId).populate('company')
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
            created_at : new Date().getTime(),
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
            console.log(err)
            return next(
                new HttpError('Reservation creation failed, please retry later', 404)
            )
        }

        companyFound.masks_stock -= masks
        companyFound.save()

        res.status(201).json({ newCommand })

    },

    deleteReservation : async function (req, res, next) {

        // recieve params
        let reservationId = req.params.reservationId
        let complete = req.body.complete

        // check params
        if (typeof complete != "boolean") {
            return next(
                new HttpError('Invalid inputs passed, please check your data', 422)
            )
        }

        let reservationFound
        try {
            reservationFound = await Reservation.findById(reservationId).populate('company')
        } catch (error) {
            return next(
                new HttpError('Unable to find requested reservation', 500)
            )
        }

        if (!reservationFound) {
            return next(
                new HttpError('Could not find reservation using this id', 404)
            )
        }

        if (reservationFound.company.id !== req.companyData.companyId) {
            return next(
                new HttpError('You are not allowed to delete this reservation.', 401)
            )
        }

        if (!complete) {
            reservationFound.company.masks_stock += reservationFound.masks
        }

        try {
            const sess = await mongoose.startSession()

            sess.startTransaction()
            await reservationFound.remove({ session: sess })
            reservationFound.company.reservations.pull(reservationFound)
            await reservationFound.company.save({ session: sess })
            await sess.commitTransaction()
        } catch (error) {
            console.log(error)
            return next(new HttpError('Could not delete the given reservation', 500))
        }

        res.status(200).json({ message: 'Reservation correctly deleted.' })
    },
}