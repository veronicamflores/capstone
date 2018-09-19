let router = require('express').Router()
let Comments = require('../models/Comments')

//GET ALL
router.get('/', (req, res, next) => {
    Comments.find({})
        .then(post => {
            res.send(post)
        })
        .catch(err => {
            res.status(400).send(err)
            next()
        })
})

module.exports = router