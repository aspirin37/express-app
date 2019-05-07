const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseHidden = require('mongoose-hidden')();

// Create user schema and model
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email field is required'],
        match: [
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            'Invalid email adress',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
        minLength: [8, 'Password must contain at least 8 characters'],
    },
    info: {
        type: String,
        default: '',
    },
});

// Add a virtual id field
UserSchema.set('toJSON', { virtuals: true });

// Hide internal _id and _v fields
UserSchema.plugin(mongooseHidden);

const User = mongoose.model('user', UserSchema);

module.exports = User;
