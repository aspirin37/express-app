const jwt = require('jsonwebtoken');
const User = require('../models/user');

// get a list of users from the db
exports.getUsers = async (req, res, next) => {
    const users = await User.find({}, '-password');

    const data = {
        total: users.length,
        users,
    };
    res.send(data);
};

// add a user to the db
exports.signUp = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(422).send({
            error: 'User already exists',
        });
    }

    await User.create(req.body);
    user = await User.findOne({ email: req.body.email }, '-password');

    const data = {
        message: 'User was successfully created',
        user,
    };
    res.status(201).send(data);
};

// sign in user
exports.signIn = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }, '-password');

    if (!user) {
        return res.status(401).send({
            error: 'Invalid email or password',
        });
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_KEY, { expiresIn: '4h' });
    res.header('access-token', token);

    const data = {
        message: 'Authorization successful',
    };
    res.send(data);
};

// get a user from the db
exports.getUser = async (req, res, next) => {
    const user = User.findOne({ _id: req.params.id }, '-password');

    if (!user) {
        return Promise.resolve('next');
    }

    res.send(user);
};

// update a user in the db
exports.updateUser = async (req, res, next) => {
    await User.updateOne({ _id: req.params.id }, req.body);

    const user = await User.findOne({ _id: req.params.id }, '-password');

    if (!user) {
        return Promise.resolve('next');
    }

    const data = {
        message: 'User was successfully updated',
        user,
    };
    res.send(data);
};

// delete a user from the db
exports.deleteUser = async (req, res, next) => {
    await User.remove({ _id: req.params.id });

    const data = {
        message: 'User was successfully deleted',
    };
    res.send(data);
};
