const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// get a list of users from the database
exports.getUsers = async (req, res, next) => {
    const users = await User.find({}, '-password');

    const data = {
        total: users.length,
        users,
    };
    res.send(data);
};

// add a user to the database
exports.signUp = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(422).send({
            error: 'User already exists',
        });
    }

    // hash the password
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwordHash;

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
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        const data = {
            error: 'Invalid email or password',
        };
        return res.status(401).send(data);
    }

    // compare the provided password with the hash in the database
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
        const data = {
            error: 'Invalid email or password',
        };
        return res.status(401).send(data);
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_KEY, { expiresIn: '4h' });
    res.header('access-token', token);

    const data = {
        message: 'Authorization successful',
    };
    res.send(data);
};

// get a user from the database
exports.getUser = async (req, res, next) => {
    const user = User.findOne({ _id: req.params.id }, '-password');

    if (!user) {
        return Promise.resolve('next');
    }

    res.send(user);
};

// update a user in the database
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

// delete a user from the database
exports.deleteUser = async (req, res, next) => {
    await User.remove({ _id: req.params.id });

    const data = {
        message: 'User was successfully deleted',
    };
    res.send(data);
};
