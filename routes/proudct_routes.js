const express = require('express')

const routes = express.Router()
const {
    getProudctId,
    createProuct,
    validateUpdatePRoudct,
    validateDeletePRoudct
} = require('../utils/validators/proudct_validate')
const
    {
        getProudct,
        getProudcts,
        addProudct,
        updateProudctId,
        deleteProudctId
    } = require('../services/proudct')

routes.route('/')
    .get(getProudcts)
    .post(
        createProuct,
        addProudct)


routes.route('/:id')
    .get(
        getProudctId,
        getProudct)
    .put(
        validateUpdatePRoudct,
        updateProudctId)
    .delete(
        validateDeletePRoudct,
        deleteProudctId)

module.exports = routes