let router = require('express').Router()
let Workouts = require('../models/Workout')

//Edit Workout
router.put('/:id', (req, res, next) => {
    Workouts.findById(req.params.id)
        .then(workout => {
            if (!workout.authorId.equals(req.session.uid)) {
                return res.status(401).send("Not authorized")
            }
            workout.update(req.body, (err) => {
                if (err) {
                    console.log(err)
                    next()
                    return
                }
                res.send("workout updated")
            });
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

//get pre-set workouts not logged in
router.get('/built', (req, res, next) => {
    Workouts.find({})
        .then(workout => {
            res.send(workout)
        })
        .catch(err => {
            res.status(400).send(err)
            next()
        })
})

//Get workouts logged in
router.get('/:id', (req, res, next) => {
    Workouts.find({ authorId: req.params.id })
        .then(workout => {
            res.send(workout)
        })
        .catch(err => {
            res.status(400).send(err)
            next()
        })
})

//get one workout
router.get('/:id', (req, res, next) => {
    Workouts.findById(req.params.id)
        .then(workout => {
            res.send(workout)
        })
        .catch(err => {
            res.status(404).send(err)
            next()
        })
})

//create workout
router.post('/', (req, res, next) => {
    req.body.authorId = req.session.uid
    req.body.created = Date.now()
    Workouts.create(req.body)
        .then(newWorkout => {
            res.send(newWorkout)
        })
        .catch(err => {
            res.status(400).send(err)
            next()
        })
})

//delete workout
router.delete('/:id', (req, res, next) => {
    Workouts.findById(req.params.id)
        .then(workout => {
            if (!workout.authorId.equals(req.session.uid)) {
                return res.status(401).send("Not authorized")
            }
            Workouts.findByIdAndRemove(req.params.id)
                .then(data => {
                    res.send('workout deleted')
                })
        })
})

module.exports = router