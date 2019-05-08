const Ninja = require('../models/ninja');

// get a list of ninjas from the db
exports.getNinjas = async (req, res, next) => {
    const ninjas = await Ninja.find();

    const data = {
        total: ninjas.length,
        ninjas,
    };
    res.send(data);
};

// add a ninja to the db
exports.addNinja = async (req, res, next) => {
    const ninja = await Ninja.create(req.body);

    const data = {
        message: 'Ninja was successfully created',
        ninja,
    };
    res.status(201).send(data);
};

// get a ninja from the db
exports.getNinja = async (req, res, next) => {
    const ninja = await Ninja.findOne({ _id: req.params.id });

    if (!ninja) {
        return Promise.resolve('next');
    }

    res.send(ninja);
};

// update a ninja in the db
exports.updateNinja = async (req, res, next) => {
    await Ninja.updateOne({ _id: req.params.id }, req.body);

    const ninja = await Ninja.findOne({ _id: req.params.id });

    if (!ninja) {
        return Promise.resolve('next');
    }

    const data = {
        message: 'Ninja was successfully updated',
        ninja,
    };
    res.send(data);
};

// delete a ninja from the db
exports.deleteNinja = async (req, res, next) => {
    await Ninja.remove({ _id: req.params.id });

    const data = {
        message: 'Ninja was successfully deleted',
    };
    res.send(data);
};
