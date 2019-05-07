const express = require('express');
const router = express.Router();

const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/', (req, res, next) => {
    Ninja.find()
        .then(ninjas => {
            const data = {
                total: ninjas.length,
                ninjas,
            };
            res.send(data);
        })
        .catch(next);
});

// add a ninja to the db
router.post('/', (req, res, next) => {
    Ninja.create(req.body)
        .then(ninja => {
            const data = {
                message: 'Ninja was successfully created',
                ninja,
            };
            res.status(201).send(data);
        })
        .catch(next);
});

// get a ninja from the db
router.get('/:id', (req, res, next) => {
    Ninja.findOne({ _id: req.params.id })
        .then(ninja => {
            ninja ? res.send(ninja) : next();
        })
        .catch(next);
});

// update a ninja in the db
router.patch('/:id', (req, res, next) => {
    Ninja.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            Ninja.findOne({ _id: req.params.id })
                .then(ninja => {
                    const data = {
                        message: 'Ninja was successfully updated',
                        ninja,
                    };
                    ninja ? res.send(data) : next();
                })
                .catch(next);
        })
        .catch(next);
});

// delete a ninja from the db
router.delete('/:id', (req, res, next) => {
    Ninja.remove({ _id: req.params.id })
        .then(() => {
            res.status(200).send({
                message: 'Ninja was successfully deleted',
            });
        })
        .catch(next);
});

module.exports = router;
