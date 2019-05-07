const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseHidden = require('mongoose-hidden')();

// Create ninja schema and model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        match: [/.*/, 'Validation example'],
    },
    belt: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false,
    },
});

// Add a virtual id field
NinjaSchema.set('toJSON', { virtuals: true });

// Hide internal _id and _v fields
NinjaSchema.plugin(mongooseHidden);

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;
