const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseHidden = require('mongoose-hidden')()

// Create ninja schema and model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    belt: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false,
    },
})

NinjaSchema.set('toJSON', { virtuals: true });
NinjaSchema.plugin(mongooseHidden);

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;
